import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Ignore build artifacts and dependencies
  { ignores: ['dist/**', 'node_modules/**'] },

  // Base JS recommended rules
  eslint.configs.recommended,

  // TypeScript recommended rules (non-type-aware for speed; type checking is via tsc)
  ...tseslint.configs.recommended,

  // Project-specific tweaks
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Add any TS-specific rule customizations here
      'no-console': 'off',
    },
  },

  // Disable stylistic rules in favor of Prettier
  eslintConfigPrettier,
];
