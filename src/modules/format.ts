import type { OxfmtOptions } from 'eslint-plugin-format/rule-options';
import type { FlatConfig } from '../types';
import { defu } from 'defu';
import pluginFormat from 'eslint-plugin-format';
import { GlobCSS, GlobHTML, GlobMarkdown } from '../globs';

export interface FormatOptions {
  oxfmt?: OxfmtOptions;
}

const { parserPlain } = pluginFormat;

const oxfmtSharedOptions: OxfmtOptions = {
  endOfLine: 'lf',
  insertFinalNewline: true,
  singleQuote: true,
  printWidth: 150,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

export function format(options: FormatOptions = {}): FlatConfig[] {
  const oxfmtOptions = defu(options.oxfmt, oxfmtSharedOptions);

  return [
    {
      name: 'silvecor/format/setup',
      plugins: {
        format: pluginFormat,
      },
    },
    {
      name: 'silvecor/format/css',
      files: [GlobCSS],
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'format/oxfmt': ['warn', oxfmtOptions],
      },
    },
    {
      name: 'silvecor/format/html',
      files: [GlobHTML],
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'format/oxfmt': [
          'warn',
          defu(oxfmtOptions, {
            embeddedLanguageFormatting: 'auto',
          }),
        ],
      },
    },
    {
      name: 'silvecor/format/markdown',
      files: [GlobMarkdown],
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'format/oxfmt': [
          'warn',
          defu(oxfmtOptions, {
            embeddedLanguageFormatting: 'off',
          }),
        ],
      },
    },
  ];
}
