import type { FlatConfig } from './types';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import {
  commands,
  ignores,
  javascript,
  type JavaScriptOptions,
  json,
  node,
  react,
  type ReactOptions,
  sort,
  toml,
  typescript,
  type TypeScriptOptions,
  vitest,
  yaml,
} from './modules';
import { combineTypeScriptOptions, normalizeOptions } from './utils';

export interface FactoryOptions {
  env?: JavaScriptOptions['env'];
  typescript?: boolean | TypeScriptOptions;
  node?: boolean;
  react?: boolean | ReactOptions;
  vitest?: boolean;
}

export function silvecor(options: FactoryOptions = {}): FlatConfigComposer {
  const configs: FlatConfig[][] = [];

  configs.push(
    ignores(),
    javascript({ env: options.env }),
    commands(),
  );
  if (options.typescript) {
    configs.push(
      typescript(
        combineTypeScriptOptions(normalizeOptions(options.typescript)),
      ),
    );
  }

  if (options.react) {
    configs.push(
      react(normalizeOptions(options.react)),
    );
  }

  if (options.node) {
    configs.push(node());
  }
  if (options.vitest) {
    configs.push(vitest());
  }
  configs.push(
    json(),
    yaml(),
    toml(),
    sort(),
  );

  return new FlatConfigComposer(...configs);
}
