import type { FlatConfig } from '../types';
import pluginToml from 'eslint-plugin-toml';
import * as parserToml from 'toml-eslint-parser';

export function toml(): FlatConfig[] {
  return [
    {
      name: 'silvecor/toml',
      files: ['**/*.toml'],
      plugins: {
        toml: pluginToml,
      },
      languageOptions: {
        parser: parserToml,
      },
      /// keep-sorted
      rules: {
        'toml/comma-style': ['warn', 'last'],
        'toml/indent': ['warn', 2],
        'toml/keys-order': 'warn',
        'toml/no-space-dots': 'warn',
        'toml/precision-of-fractional-seconds': 'error',
        'toml/precision-of-integer': 'error',
        'toml/tables-order': 'warn',
      },
    },
  ];
}
