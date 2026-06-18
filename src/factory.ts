import {
  commands,
  ignores,
  javascript,
  json,
  node,
  type JavaScriptOptions,
  typescript,
  type TypeScriptOptions,
  yaml,
} from "./modules";
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { FlatConfig } from "./types";
import { combineTypeScriptOptions, normalizeOptions } from "./utils";

export interface FactoryOptions {
  env?: JavaScriptOptions['env'];
  typescript?: boolean | TypeScriptOptions;
  node?: boolean;
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

  if (options.node) {
    configs.push(node());
  }
  configs.push(
    json(),
    yaml(),
  );

  return new FlatConfigComposer(...configs);
}
