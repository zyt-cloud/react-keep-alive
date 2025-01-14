import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist'] },
  { files: ['src/**/*.{ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'prefer-const': 'error',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'any', prev: 'block-like', next: ['return', 'expression'] },
        { blankLine: 'always', prev: ['let', 'const'], next: 'block-like' },
        { blankLine: 'any', prev: ['let', 'const'], next: 'if' },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]
