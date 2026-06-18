import type { TypeScriptOptions } from "./modules/typescript";

export const normalizeOptions = <T>(options: boolean | undefined | T): T =>
  (typeof options === 'boolean' || typeof options === 'undefined')
    ? {} as T
    : options;

export const isInEditor = (): boolean =>
  !process.env.CI
  && !process.env.GIT_PARAMS
  && !process.env.VSCODE_GIT_COMMAND
  && !process.env.npm_lifecycle_script?.startsWith('lint-staged')
  && !!(
    process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
    || (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
  );


export const combineTypeScriptOptions = (options: TypeScriptOptions): TypeScriptOptions =>
  ({ ...options, inEditor: isInEditor(), });
