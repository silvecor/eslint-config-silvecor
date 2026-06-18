import type { FlatConfig } from '../types';
import pluginNode from 'eslint-plugin-n';

export function node(): FlatConfig[] {
  return [
    {
      name: 'silvecor/node',
      plugins: {
        n: pluginNode,
      },
      rules: {
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-unpublished-bin': 'error',
        'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
        'n/no-unpublished-require': 'error',
        'n/process-exit-as-throw': 'error',
        'n/prefer-promises/dns': 'error',
      },
    },
  ];
};
