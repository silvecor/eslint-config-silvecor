import { javascript, type JavaScriptOptions } from "./modules/javascript";
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { FlatConfig } from "./types";

export interface FactoryOptions {
  env?: JavaScriptOptions['env'];
}

export function silvecor(options: FactoryOptions = {}): FlatConfigComposer {
  const configs: FlatConfig[][] = [];

  configs.push(
    javascript({ env: options.env }),
  );

  return new FlatConfigComposer(...configs);
}
