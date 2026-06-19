import type { FlatConfig } from '../types';
import pluginReact from '@eslint-react/eslint-plugin';
import { GlobTS, GlobTSX } from '../globs';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y-x';
import pluginReactRefresh, { type OnlyExportComponentsOptions } from 'eslint-plugin-react-refresh';
import pluginNext from '@next/eslint-plugin-next';
import globals from 'globals';
import { defu } from 'defu';
import { allowExportNames } from '../data/fast-refresh';

export interface ReactOptions {
  /**
   * Whether to check `.ts` files as well.
   * @default false
   */
  checkNonJSXFiles?: boolean;
  /**
   * The prop used for polymorphic components.
   * @see https://eslint-react.xyz/docs/configuration/configure-analyzer#polymorphicpropname
   * @default undefined
   */
  polymorphicPropName?: string;
  /**
   * Additional hooks to be considered as custom hooks that have dependencies.
   * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration
   * @example ['useIsomorphicLayoutEffect', 'useAbortableEffect']
   * @default []
   */
  additionalHooksWithDeps?: string[];
  /**
   * Whether to enable React Fast Refresh rules.
   * @default true
   */
  reactFastRefresh?: boolean | Omit<OnlyExportComponentsOptions, 'checkJS'>;
  /**
   * Which framework is being used. This can be used to enable framework-specific rules.
   * @default 'none'
   */
  framework?: 'none' | 'next' | 'reactRouter' | 'vite';
  /**
   * Whether RSC is used.
   * @see https://eslint-react.xyz/docs/rules/rsc-function-definition
   * @default true
   */
  rsc?: boolean;
}

export function react(options: ReactOptions = {}): FlatConfig[] {
  const {
    checkNonJSXFiles = false,
    polymorphicPropName,
    additionalHooksWithDeps = [],
    reactFastRefresh = true,
    framework = 'none',
    rsc = true,
  } = options;

  const reactFastRefreshOptions = defu(
    typeof reactFastRefresh !== 'object' ? {} : reactFastRefresh, 
    {
      allowConstantExport: framework === 'vite' || framework === 'reactRouter',
      allowExportNames: framework in allowExportNames ? allowExportNames[framework] : [],
    }
  );

  const files = checkNonJSXFiles ? [GlobTS, GlobTSX] : [GlobTSX];
  const configs: FlatConfig[] = [
    {
      name: 'silvecor/react',
      files,
      languageOptions: {
        globals: globals.browser,
      },
      settings: {
        'react-x': {
          version: 'detect',
          polymorphicPropName,
        },
      },
      plugins: {
        react: pluginReact,
        'react-refresh': pluginReactRefresh,
      },
      /// keep-sorted
      rules: {
        'react/dom-no-dangerously-set-innerhtml-with-children': 'error',
        'react/dom-no-dangerously-set-innerhtml': 'warn',
        'react/dom-no-find-dom-node': 'error',
        'react/dom-no-flush-sync': 'warn',
        'react/dom-no-hydrate': 'error',
        'react/dom-no-missing-button-type': 'error',
        'react/dom-no-missing-iframe-sandbox': 'warn',
        'react/dom-no-render-return-value': 'error',
        'react/dom-no-render': 'error',
        'react/dom-no-script-url': 'error',
        'react/dom-no-string-style-prop': 'warn',
        'react/dom-no-unsafe-iframe-sandbox': 'error',
        'react/dom-no-unsafe-target-blank': 'warn',
        'react/dom-no-use-form-state': 'error',
        'react/dom-no-void-elements-with-children': 'error',
        'react/exhaustive-deps': [
          'warn',
          {
            additionalHooks: `(${additionalHooksWithDeps.join('|')})`,
          },
        ],
        'react/globals': 'error',
        'react/immutability': 'error',
        'react/purity': 'error',
        'react/refs': 'error',
        'react/rules-of-hooks': 'error',
        'react/set-state-in-effect': 'error',
        'react/set-state-in-render': 'error',
        'react/static-components': 'error',
        'react/naming-convention-context-name': 'warn',
        'react/use-state': [
          'warn',
          {
            enforceAssignment: true,
            enforceSetterName: true,
          },
        ],
        'react-refresh/only-export-components': [
          reactFastRefresh ? 'warn' : 'off',
          reactFastRefreshOptions,
        ],
        'react/web-api-no-leaked-event-listener': 'error',
        'react/web-api-no-leaked-interval': 'error',
        'react/web-api-no-leaked-resize-observer': 'error',
        'react/web-api-no-leaked-timeout': 'error',
        'react/jsx-no-key-after-spread': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-iife': 'warn',
        'react/jsx-no-namespace': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-count': 'error',
        'react/no-children-for-each': 'error',
        'react/no-children-map': 'error',
        'react/no-children-only': 'error',
        'react/no-children-to-array': 'error',
        'react/no-class-component': 'warn',
        'react/no-clone-element': 'error',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'error',
        'react/no-create-ref': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-leaked-conditional-rendering': 'error',
        'react/no-missing-key': 'error',
        'react/no-set-state-in-component-did-mount': 'error',
        'react/no-set-state-in-component-did-update': 'error',
        'react/no-set-state-in-component-will-update': 'error',
        'react/no-unnecessary-use-prefix': 'warn',
        'react/no-unstable-context-value': 'error',
        'react/no-unstable-default-props': 'error',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-use-context': 'warn',
        'react/rsc-function-definition': rsc ? 'error' : 'off',
      },
    },
    {
      name: 'silvecor/react/a11y',
      files,
      plugins: {
        'jsx-a11y': pluginJsxA11y,
      },
      /// keep-sorted
      rules: {
        'jsx-a11y/alt-text': [
          'warn',
          {
            elements: ['img'],
            img: ['Image'],
          },
        ],
        'jsx-a11y/anchor-is-valid': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/autocomplete-valid': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/no-access-key': 'error',
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/no-distracting-elements': 'error',
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'jsx-a11y/no-noninteractive-tabindex': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/tabindex-no-positive': 'error',
      },
    },
  ];

  if (framework === 'next') {
    configs.push({
      name: 'silvecor/react/next',
      files,
      plugins: {
        next: pluginNext,
      },
      /// keep-sorted
      rules: {
        'next/google-font-display': 'warn',
        'next/google-font-preconnect': 'warn',
        'next/inline-script-id': 'error',
        'next/next-script-for-ga': 'warn',
        'next/no-assign-module-variable': 'error',
        'next/no-async-client-component': 'error',
        'next/no-before-interactive-script-outside-document': 'error',
        'next/no-css-tags': 'warn',
        'next/no-document-import-in-page': 'error',
        'next/no-duplicate-head': 'error',
        'next/no-head-element': 'warn',
        'next/no-head-import-in-document': 'error',
        'next/no-html-link-for-pages': 'error',
        'next/no-img-element': 'warn',
        'next/no-page-custom-font': 'warn',
        'next/no-script-component-in-head': 'warn',
        'next/no-styled-jsx-in-document': 'warn',
        'next/no-sync-scripts': 'warn',
        'next/no-typos': 'warn',
        'next/no-unwanted-polyfillio': 'error',
      },
    });
  }

  return configs;
}
