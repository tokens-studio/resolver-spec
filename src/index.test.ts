import { describe, expect, test } from 'vitest';
import primerColorLight from './data/github-primer/color/light.json';
import primerColorLightHC from './data/github-primer/color/light.high-contrast.json';
import primerColorDark from './data/github-primer/color/dark.json';
import primerColorDarkHC from './data/github-primer/color/dark.high-contrast.json';
import primerColorDarkDimmed from './data/github-primer/color/dark.dimmed.json';
import primerSize from './data/github-primer/size/size.json';
import { createResolver } from './index.js';

const GITHUB_PRIMER: Record<string, any> = {
  'color/light.json': primerColorLight,
  'color/light.high-contrast.json': primerColorLightHC,
  'color/dark.json': primerColorDark,
  'color/dark.high-contrast.json': primerColorDarkHC,
  'color/dark.dimmed.json': primerColorDarkDimmed,
  'size/size.json': primerSize,
};

describe('createResolver', () => {
  const r = createResolver(GITHUB_PRIMER, {
    sets: [
      { name: 'color', values: ['color/light.json'] },
      { name: 'size', values: ['size/size.json'] },
    ],
    modifiers: [
      {
        name: 'theme',
        values: [
          { name: 'light', values: ['color/light.json'] },
          { name: 'light-hc', values: ['color/light.high-contrast.json'] },
          { name: 'dark', values: ['color/dark.json'] },
          { name: 'dark-hc', values: ['color/dark.high-contrast.json'] },
          { name: 'dark-dimmed', values: ['color/dark.dimmed.json'] },
        ],
      },
    ],
  });

  test('basic', () => {
    expect(r.tokens).toMatchSnapshot('default');
    expect(r.apply({ theme: 'light' })).toMatchSnapshot('theme: light');
    expect(r.apply({ theme: 'light-hc' })).toMatchSnapshot('theme: light-hc');
    expect(r.apply({ theme: 'dark' })).toMatchSnapshot('theme: dark');
    expect(r.apply({ theme: 'dark-hc' })).toMatchSnapshot('theme: dark-hc');
    expect(r.apply({ theme: 'dark-dimmed' })).toMatchSnapshot('theme: dark-dimmed');
  });

  test('missing sets', () => {
    expect(() =>
      createResolver(GITHUB_PRIMER, { sets: [], modifiers: [] } as any),
    ).not.toThrowError();
  });

  test('missing apply()', () => {
    expect(() => r.apply({})).toThrowError('Can’t apply an empty value set');
  });

  describe('validation', () => {
    test('empty map', () => {
      expect(() => createResolver({}, { sets: [], modifiers: [] } as any)).toThrowError(
        'Empty token map',
      );
    });

    test('empty modifiers', () => {
      const r = createResolver(GITHUB_PRIMER, { modifiers: [] } as any);
      expect(() => r.apply({ foo: 'bar' })).toThrowError('No modifiers defined');
    });
  });
});
