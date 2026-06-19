import type { FlatConfig } from '../types';
import gitignore from 'eslint-config-flat-gitignore';
import { GlobIgnores } from '../globs';

export function ignores(): FlatConfig[] {
  return [
    {
      name: 'silvecor/ignores/base',
      ignores: GlobIgnores,
    },
    gitignore({
      name: 'silvecor/ignores/gitignore',
      strict: false,
    }),
  ];
}
