import type { FlatConfig, Rules } from '../types';
import { GlobJson, GlobJson5, GlobJsonc } from '../globs';
import pluginJson from 'eslint-plugin-jsonc';
import * as parserJson from 'jsonc-eslint-parser';

const jsonSharedOptions: FlatConfig = {
  plugins: {
    json: pluginJson,
  },
  languageOptions: {
    parser: parserJson,
  },
};

/// keep-sorted
const jsonSharedRules: Rules = {
  'json/no-bigint-literals': 'error',
  'json/no-binary-expression': 'error',
  'json/no-binary-numeric-literals': 'error',
  'json/no-dupe-keys': 'error',
  'json/no-escape-sequence-in-identifier': 'error',
  'json/no-number-props': 'error',
  'json/no-numeric-separators': 'error',
  'json/no-octal-numeric-literals': 'error',
  'json/no-octal': 'error',
  'json/no-parenthesized': 'error',
  'json/no-regexp-literals': 'error',
  'json/no-sparse-arrays': 'error',
  'json/no-template-literals': 'error',
  'json/no-undefined-value': 'error',
  'json/no-unicode-codepoint-escapes': 'error',
  'json/no-useless-escape': 'error',
  'json/space-unary-ops': 'error',
  'json/vue-custom-block/no-parsing-error': 'error',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  strict: 'off',
};

export function json(): FlatConfig[] {
  return [
    {
      name: 'silvecor/json/json',
      files: [GlobJson],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': 'error',
        'json/indent': ['warn', 2],
        'json/no-comments': 'error',
        'json/no-floating-decimal': 'error',
        'json/no-hexadecimal-numeric-literals': 'error',
        'json/no-infinity': 'error',
        'json/no-multi-str': 'error',
        'json/no-nan': 'error',
        'json/no-plus-sign': 'error',
        'json/quote-props': 'error',
        'json/valid-json-number': 'error',
      },
    },
    {
      name: 'silvecor/json/jsonc',
      files: [GlobJsonc],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': ['error', 'always-multiline'],
        'json/no-floating-decimal': 'error',
        'json/no-hexadecimal-numeric-literals': 'error',
        'json/no-infinity': 'error',
        'json/no-multi-str': 'error',
        'json/no-nan': 'error',
        'json/no-plus-sign': 'error',
        'json/quote-props': 'error',
        'json/valid-json-number': 'error',
      },
    },
    {
      name: 'silvecor/json/json5',
      files: [GlobJson5],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': ['error', 'always-multiline'],
        'json/quotes': ['error', 'single', { avoidEscape: true }],
      },
    },
  ];
}
