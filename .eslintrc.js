module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:react-native-a11y/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'react-hooks',
    'prettier',
    'jsx-a11y',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['/^react/', '/^@react/'],
          'module',
          '/^~/util/',
          ['/^~/components/', '/^~/screens/'],
          '/^~/',
          ['parent', 'sibling', 'index'],
        ],
        // alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/Reactotron.js'] },
    ],
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    camelcase: 'off',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'react-native-a11y/has-accessibility-props': [
      'error',
      {
        touchables: ['TouchableOpacity'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
