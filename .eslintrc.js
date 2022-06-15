module.exports = {
    root: true,
    extends: ['./node_modules/asmosi/eslint'],
    rules: {
        // Custom Rules
        // ...
        'no-console': 'off',
        'no-var': 'off',
    },
    overrides: [
        {
            files: ['vite.config.js'],
            env: {
                node: true,
            },
        },
    ],
};
