module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'script', // Для обычных JavaScript файлов
    project: './tsconfig.json', // Для TypeScript файлов
  },
  compilerOptions: {
    "module": "CommonJS"
  },
  plugins: ['react-refresh'],
  rules: {
    'global-require': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
