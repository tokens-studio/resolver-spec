import StyleDictionary from 'style-dictionary';
import { fs } from 'style-dictionary/fs';
import type { TransformedToken } from 'style-dictionary/types';
import { permutateThemes } from '@tokens-studio/sd-transforms';
import type { ThemeObject } from '@tokens-studio/types';
import { LitElement, css, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { init } from '../../monaco/monaco.js';
import core from './tokens/core.json';
import light from './tokens/light.json';
import dark from './tokens/dark.json';
import resolver from './resolver.json';

const files = {
  core,
  light,
  dark,
  resolver,
};

async function mirrorTokenFiles() {
  await fs.promises.mkdir('tokens');
  const write = async (path: string, content: object) => {
    return fs.promises.writeFile(path, JSON.stringify(content, null, 2));
  };
  await Promise.all(
    (
      [
        ['tokens/core.json', files.core],
        ['tokens/light.json', files.light],
        ['tokens/dark.json', files.dark],
      ] as [string, object][]
    ).map(([path, content]) => write(path, content)),
  );
}

export class SdDemo extends LitElement {
  static get styles() {
    return [
      css`
        table {
          text-align: left;
          font-size: 12px;
          margin-bottom: 2rem;
        }

        @keyframes render {
          from {
            background: #ccf;
          }

          to {
            background: transparent;
          }
        }

        th {
          padding: 0 1em;
          animation: 0.5s render;
        }

        .color-box {
          display: inline-block;
          margin-right: 0.5em;
          vertical-align: sub;
          width: 20px;
          height: 20px;
        }

        details {
          margin-top: 2em;
        }
      `,
    ];
  }

  static get properties() {
    return {
      mode: {
        state: true,
      },
      tokensArray: {
        state: true,
      },
    };
  }

  declare _mode: 'dark' | 'light';
  declare tokensArray: TransformedToken[];
  declare themesData: Record<string, string[]>;
  declare hasInitialized: Promise<void>;
  declare editor: any;
  declare hasInitializedResolve: () => void;

  get mode() {
    return this._mode;
  }

  set mode(v) {
    this._mode = v;
    this.onThemeChange();
  }

  constructor() {
    super();
    this.hasInitialized = new Promise((resolve) => {
      this.hasInitializedResolve = resolve;
    });
    this.themesData = {};
    this.tokensArray = [];
    this.editor = undefined;
    this.mode = 'dark';
    this.init();
  }

  async init() {
    await mirrorTokenFiles();
    const permutateInput = this.mapToPermutateThemesInput(files.resolver);
    this.themesData = permutateThemes(permutateInput);
    await this.updateComplete;
    const slotEl = this.shadowRoot?.querySelector('slot[name="monaco-editor"]') as HTMLSlotElement;
    const editorElem = slotEl.assignedNodes()[0];
    this.editor = await init(editorElem as HTMLDivElement);
    this.editor.setValue(JSON.stringify(files.resolver, null, 2));
    this.hasInitializedResolve();
  }

  async onThemeChange() {
    await this.hasInitialized;
    const sd = new StyleDictionary({
      source: this.themesData[this.mode].map((themeSets: string) => `tokens/${themeSets}`),
      log: {
        verbosity: 'verbose',
      },
      platforms: {
        foo: {
          transforms: ['name/kebab'],
        },
      },
    });
    const { allTokens } = await sd.getPlatformTokens('foo');
    this.tokensArray = allTokens;
  }

  mapToPermutateThemesInput(res: typeof files.resolver) {
    let count = 0;
    const resolveSetName = (setNameOrPath: string) => {
      if (setNameOrPath.includes('.')) {
        return [setNameOrPath];
      }
      return res.sets.find((set) => set.name === setNameOrPath)?.values;
    };

    return res.modifiers.reduce((acc, curr) => {
      const variants = curr.values.map((variant) => ({
        id: `${count++}`,
        group: curr.name,
        name: variant.name,
        selectedTokenSets: Object.fromEntries(
          variant.values.flatMap(resolveSetName).map((set) => [set, 'enabled']),
        ),
      }));
      return [...acc, ...variants];
    }, [] as ThemeObject[]);
  }

  render() {
    return html`
      <label>
        Mode
        <select
          @change=${(e: Event) =>
            (this.mode = (e.target as HTMLSelectElement).value as 'light' | 'dark')}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </label>
      ${this.tokensArray
        ? html`<table>
            <caption>
              Tokens Table
            </caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Resolved</th>
                <th>Original</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              ${this.tokensArray.map(
                (token) => html`
                  <tr>
                    <th>${token.name}</th>
                    ${unsafeHTML(`<th>${this.renderValue(token)}</th>`)}
                    ${unsafeHTML(`<th>${token.original.$value}</th>`)}
                    <th>${token.$type}</th>
                    ${unsafeHTML(`<th>${token.filePath}</th>`)}
                  </tr>
                `,
              )}
            </tbody>
          </table>`
        : ``}

      <select
        @change=${(e: Event) =>
          this.switchFile((e.target as HTMLSelectElement).value as keyof typeof files)}
      >
        <option value="resolver">resolver.json</option>
        <option value="core">tokens/core.json</option>
        <option value="dark">tokens/dark.json</option>
        <option value="light">tokens/light.json</option>
      </select>
      <slot name="monaco-editor"></slot>
    `;
  }

  switchFile(file: keyof typeof files) {
    this.editor.setValue(JSON.stringify(files[file], null, 2));
  }

  renderValue(token: TransformedToken) {
    switch (token.$type) {
      case 'color':
        return `<div class="color-box" style="background-color: ${token.$value};"></div>${token.$value}`;
      default:
        return `${token.$value}`;
    }
  }
}

customElements.define('sd-demo', SdDemo);
