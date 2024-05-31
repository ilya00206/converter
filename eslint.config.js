// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/contextual-lifecycle': 'warn',
      '@angular-eslint/sort-lifecycle-methods': 'warn',
      '@angular-eslint/no-conflicting-lifecycle': 'warn',
      '@angular-eslint/no-lifecycle-call': 'warn',
      '@angular-eslint/directive-selector': [
        'warn',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'warn',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/contextual-decorator': 'warn',
      '@angular-eslint/no-input-rename': 'warn',
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/default-param-last': 'warn',
      '@typescript-eslint/unbound-method': 'off',
      // strict
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/consistent-generic-constructors': 'warn',
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/no-duplicate-attributes': ['warn'],
      '@angular-eslint/template/alt-text': ['warn'],
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/conditional-complexity': ['warn', { maxComplexity: 3 }],
      '@angular-eslint/template/elements-content': ['warn'],
      '@angular-eslint/template/interactive-supports-focus': ['warn'],
      '@angular-eslint/template/label-has-associated-control': ['warn'],
      '@angular-eslint/template/mouse-events-have-key-events': ['warn'],
      '@angular-eslint/template/no-any': ['warn'],
      '@angular-eslint/template/no-autofocus': ['warn'],
      '@angular-eslint/template/no-distracting-elements': ['warn'],
      '@angular-eslint/template/prefer-ngsrc': ['warn'],
      '@angular-eslint/template/role-has-required-aria': ['warn'],
      '@angular-eslint/template/table-scope': ['warn'],
      '@angular-eslint/template/valid-aria': ['warn'],
      '@angular-eslint/template/attributes-order': ['warn'],
    },
  }
);
