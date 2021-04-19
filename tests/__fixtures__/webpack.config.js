const path = require('path');
const SimpleStopwatchPlugin = require('../../index.js');

module.exports = {
    mode: 'development',
    entry: './tests/__fixtures__/src/index.js',
    plugins: [new SimpleStopwatchPlugin({ statsFolder: '.stats' })],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
