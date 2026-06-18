import type { FlatConfig } from '../types';
import pluginYaml from 'eslint-plugin-yml';
import * as parserYaml from 'yaml-eslint-parser';

export function yaml(): FlatConfig[] {
  return [
    {
      name: 'silvecor/yaml/yaml',
      files: ['**/*.y?(a)ml'],
      plugins: {
        yaml: pluginYaml,
      },
      languageOptions: {
        parser: parserYaml,
      },
      /// keep-sorted
      rules: {
        'yaml/block-mapping-question-indicator-newline': 'error',
        'yaml/block-mapping': 'error',
        'yaml/block-sequence-hyphen-indicator-newline': 'error',
        'yaml/block-sequence': 'error',
        'yaml/flow-mapping-curly-newline': 'error',
        'yaml/flow-mapping-curly-spacing': 'error',
        'yaml/flow-sequence-bracket-newline': 'error',
        'yaml/flow-sequence-bracket-spacing': 'error',
        'yaml/indent': ['warn', 2],
        'yaml/key-spacing': 'error',
        'yaml/no-empty-document': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-mapping-value': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/quotes': [
          'warn',
          {
            prefer: 'single',
            avoidEscape: true,
          },
        ],
        'yaml/spaced-comment': 'error',
      },
    },
  ];
}
