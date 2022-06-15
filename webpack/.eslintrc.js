module.exports = {
    root: true,
    extends: ['../node_modules/asmosi/eslint'],
    env: {
        node: true,
    },
    rules: {
        // Custom Rules
        // ...
        'no-console': 'off',
        'no-var': 'off',
    },
};
