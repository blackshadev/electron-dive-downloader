module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
    'plugin:promise/recommended',
  ],

  plugins: ['@typescript-eslint', 'prettier', 'react', 'promise'],

  rules: {
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides: [
    {
      files: ['*.test.tsx'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
