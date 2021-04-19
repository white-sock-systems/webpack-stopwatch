const webpack = require('webpack');
const Plugin = require('../index');
const path = require('path');

const co = (compiler) =>
    new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) {
                return reject(error);
            }

            return resolve(stats);
        });
    });

const compiler = webpack({
    mode: 'development',
    entry: './__fixtures__/index.js',
    plugins: [new Plugin({ statsFolder: '.stats', quiet: true })],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
});

describe('Compile Output', () => {
    test('should match previous output', async () => {
        const res = await co(compiler);
        // hash = content of output
        expect(res.compilation.fullHash).toMatchSnapshot();
    });
});
