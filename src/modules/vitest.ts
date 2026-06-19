import type { FlatConfig } from '../types';
import pluginVitest from '@vitest/eslint-plugin';

export function vitest(): FlatConfig[] {
  return [
    {
      name: 'silvecor/vitest',
      plugins: {
        vitest: pluginVitest,
      },
      rules: {
        'vitest/consistent-test-it': ['warn', { fn: 'it', withinDescribe: 'it' }],
        'vitest/consistent-vitest-vi': ['warn', { fn: 'vi' }],
        'vitest/no-disabled-tests': 'warn',
        'vitest/no-focused-tests': 'error',
        'vitest/no-identical-title': 'error',
        'vitest/no-import-node-test': 'error',
        'vitest/no-interpolation-in-snapshots': 'warn',
        'vitest/no-standalone-expect': 'error',
        'vitest/no-unneeded-async-expect-function': 'warn',
        'vitest/prefer-hooks-in-order': 'warn',
      },
    },
  ];
}
