import type { FlatConfig } from '../types';
import createCommand from 'eslint-plugin-command/config';

export function commands(): FlatConfig[] {
  return [
    {
      ...createCommand(),
      name: 'silvecor/commands',
    },
  ];
}
