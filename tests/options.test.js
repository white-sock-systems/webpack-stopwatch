const Plugin = require('../index');
const fs = require('fs');
jest.mock('fs');

describe('Options', () => {
    test('should pass options to plugin', () => {
        const testStatsFolder = './some/stuff/here';

        fs.readFileSync.mockReturnValueOnce('{}');

        const plugin = new Plugin({ statsFolder: testStatsFolder, quiet: true });
        expect(plugin.statsFolder).toBe(testStatsFolder);
    });

    test('should work without options', () => {
        fs.readFileSync.mockReturnValueOnce('{}');

        const plugin = new Plugin();
        expect(plugin.statsFolder).toBeTruthy();
    });
});
