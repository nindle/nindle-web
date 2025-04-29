module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true
  },
  env: {
    node: true,
    browser: true,
    es2020: true
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    'no-console': 0,
    'no-unused-vars': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 0
  },
  ignorePatterns: ['**/*.less', '**/*.css', '**/*.html'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
}
