const fs = require("fs");
const c = require("ansi-colors");

// TODO: add commitlint
// TODO: try rollup - what does it end up generating?
// TODO: add standard-release like in https://github.com/webpack-contrib/compression-webpack-plugin/blob/master/package.json
// TODO: add unit tests
// TODO: try to run webpack from js - programmatically
// TODO: then it might make sense to offer json output - that can be validated against a schema as a return type
// TODO: might need to mock the stuff to return specific duration values...
class SimpleStopwatchPlugin {
	constructor(options) {
		const statsFolder = options.statsFolder || ".stats";
		this.statsFilePath = `${statsFolder}/webpack-stopwatch.json`;
		this.data = JSON.parse(fs.readFileSync(this.statsFilePath, "utf8"));

		this.statsToday = [];
		this.statsThisMonth = [];
	}

	apply(compiler) {
		compiler.hooks.done.tap(
			"Hello World Plugin",
			(stats) => {
				console.log(
					c.dim("-----------------------------------------------------------\n"),
				);

				const {compilation} = stats;
				const mode = compilation.options.mode || "development";
				const {startTime, endTime} = compilation;

				// update data sheet
				const duration = endTime - startTime;
				this.aggregate({mode});
				this.updateData({duration, mode, startTime});
				this.analyseAll({lastBuildDuration: duration});
				console.log(
					c.dim("-----------------------------------------------------------\n"),
				);
			},
		);
	}

	analyseAll({lastBuildDuration}) {
		console.log("Analysing your compile times...");
		this.analyseInterval({
			stats: this.statsToday,
			label: "today",
			lastBuildDuration,
		});
		this.analyseInterval({
			stats: this.statsThisMonth,
			label: "this month",
			lastBuildDuration,
		});
	}

	analyseInterval = ({stats, label, lastBuildDuration}) => {
		console.log(c.bold(`\n${label.toUpperCase()} \n`));

		const sum = stats.reduce((a, b) => a + b, 0);
		const avg = Math.round(sum / stats.length) || 0;

		console.info(`${c.bold(avg.toString())} ms average`);

		const diff = lastBuildDuration - avg;
		const diffAbs = Math.abs(diff);
		const wasSlower = diff >= 0;

		if (wasSlower) {
			console.log(c.red(`${c.bold(diffAbs.toString())} ms slower than average`));
		} else {
			console.log(
				c.green(`${c.bold(diffAbs.toString())} ms faster than average`),
			);
		}
		console.log(c.bold(`${c.bold(sum.toString())} ms total\n`));
	};

	updateData({duration, mode, startTime}) {
		const updatedData = {
			...this.data,
			[mode]: {...this.data[mode], [startTime]: duration},
		};

		fs.writeFileSync(
			this.statsFilePath,
			JSON.stringify(updatedData),
			() => console.log("Stats updated \u{1f389}"),
		);
	}

	aggregate({mode}) {
		const today = new Date();

		for (const timestamp in this.data[mode]) {
			if (Object.prototype.hasOwnProperty.call(this.data[mode], timestamp)) {
				const ts = Number(timestamp);
				const tsDateString = new Date(ts).toISOString();
				const todayDateString = today.toISOString();

				const isToday =
					todayDateString.substr(0, 10) === tsDateString.substr(0, 10);
				const isThisMonth =
					todayDateString.substr(0, 7) === tsDateString.substr(0, 7);

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
