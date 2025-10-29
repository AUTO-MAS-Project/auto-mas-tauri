module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier' // 必须放在最后，以覆盖冲突规则
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-hooks/exhaustive-deps': 'warn'
    },
    settings: { react: { version: 'detect' } }
};