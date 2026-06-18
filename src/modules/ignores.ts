import type { FlatConfig } from '../types';
import { GlobIgnores } from '../globs';
import gitignore from 'eslint-config-flat-gitignore';

export function ignores (): FlatConfig[] {
  return [
    {
      name: 'silvecor/ignores/base',
      ignores: GlobIgnores
    },
    gitignore({
      name: 'silvecor/ignores/gitignore',
      strict: false,
    }),
  ];
}
