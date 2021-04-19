const fs = require('fs');
const c = require('ansi-colors');

class SimpleStopwatchPlugin {
    constructor({ statsFolder, quiet } = { statsFolder: './stats', quiet: false }) {
        this.statsFolder = statsFolder;
        this.quiet = quiet;
        this.statsFilePath = `${this.statsFolder}/webpack-stopwatch.json`;

        try {
            this.data = JSON.parse(fs.readFileSync(this.statsFilePath, 'utf8'));
        } catch (e) {
            this.data = [];
            fs.mkdirSync(this.statsFolder);
            fs.writeFileSync(this.statsFilePath, JSON.stringify({}), { flag: 'w+' });
        }

        this.statsToday = [];
        this.statsThisMonth = [];

        this.output = [];
    }

    log(text) {
        this.output.push(text);
    }

    print() {
        if (!this.quiet) {
            this.output.map((l) => console.log(l));
        }
    }

    apply(compiler) {
        compiler.hooks.done.tap('Hello World Plugin', (stats) => {
            const { compilation } = stats;
            const mode = compilation.options.mode || 'development';
            const { startTime, endTime } = compilation;

            // update data sheet
            const duration = endTime - startTime;
            this.aggregate({ mode });
            this.updateData({ duration, mode, startTime });
            this.analyseAll({ lastBuildDuration: duration });

            // return to console
            this.print();
        });
    }

    analyseAll({ lastBuildDuration }) {
        this.log('Analysing your compile times...');
        this.analyseInterval({
            stats: this.statsToday,
            label: 'today',
            lastBuildDuration,
        });
        this.analyseInterval({
            stats: this.statsThisMonth,
            label: 'this month',
            lastBuildDuration,
        });
    }

    analyseInterval({ stats, label, lastBuildDuration }) {
        this.log(c.bold(`\n${label.toUpperCase()} \n`));

        const sum = stats.reduce((a, b) => a + b, 0);
        const avg = Math.round(sum / stats.length) || 0;

        this.log(`${c.bold(avg.toString())} ms average`);

        const diff = lastBuildDuration - avg;
        const diffAbs = Math.abs(diff);
        const wasSlower = diff >= 0;

        if (wasSlower) {
            this.log(c.red(`${c.bold(diffAbs.toString())} ms slower than average`));
        } else {
            this.log(c.green(`${c.bold(diffAbs.toString())} ms faster than average`));
        }
        this.log(c.bold(`${c.bold(sum.toString())} ms total\n`));
    }

    updateData({ duration, mode, startTime }) {
        const updatedData = {
            ...this.data,
            [mode]: { ...this.data[mode], [startTime]: duration },
        };

        fs.writeFileSync(this.statsFilePath, JSON.stringify(updatedData), () => console.log('Stats updated \u{1f389}'));
    }

    aggregate({ mode }) {
        const today = new Date();

        for (const timestamp in this.data[mode]) {
            if (Object.prototype.hasOwnProperty.call(this.data[mode], timestamp)) {
                const ts = Number(timestamp);
                const tsDateString = new Date(ts).toISOString();
                const todayDateString = today.toISOString();

                const isToday = todayDateString.substr(0, 10) === tsDateString.substr(0, 10);
                const isThisMonth = todayDateString.substr(0, 7) === tsDateString.substr(0, 7);

                if (isToday) {
                    this.statsToday.push(this.data[mode][timestamp]);
                }

                if (isThisMonth) {
                    this.statsThisMonth.push(this.data[mode][timestamp]);
                }
            }
        }
    }
}

module.exports = SimpleStopwatchPlugin;
