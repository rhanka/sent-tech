import svelte from 'eslint-plugin-svelte';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.svelte'],
    rules: {
      'no-console': 'warn'
    }
  }
];
