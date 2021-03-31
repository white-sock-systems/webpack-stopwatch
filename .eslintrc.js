module.exports = {
    extends: ['alloy', 'plugin:prettier/recommended'],
    env: {
        browser: false,
        node: true,
        mocha: false,
        jest: true,
        jquery: false,
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    },
};
