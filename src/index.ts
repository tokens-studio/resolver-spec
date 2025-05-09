/**
 * ⚠️ WARNING! This is just an implementation of the resolver spec
 * for demo purposes. It is subject to change, or possibly fall out
 * of sync with the specification. In case of a deviation, prefer
 * the official specification over this example library.
 */
import { mergeTokenSets } from './set.js';
import type { DTCGTokens, Resolver } from './types.js';
import { mergeTokens } from './utils.js';

export function createResolver<T extends Record<string, any> = DTCGTokens>(
  tokenMap: Record<string, T>,
  resolver: Resolver,
) {
  if (!Object.keys(tokenMap ?? {}).length) {
    throw new Error(`Empty token map! No tokens to resolve`);
  }

  const tokens: T = resolver?.sets?.length
    ? mergeTokenSets(
        resolver.sets
          .map(({ name, values }) => {
            if (!values?.length) {
              throw new Error(`Token set ${name} can’t contain empty array of values`);
            }
            return values.map<T>((id) => getTokens(id));
          })
          .flat(),
      )
    : ({} as T);

  function getTokens(id: keyof typeof tokenMap) {
    if (!(id in tokenMap)) {
      throw new Error(`Tokens "${id}" missing in tokenMap!`);
    }
    return tokenMap[id];
  }

  return {
    tokens,
    getTokens,
    apply(values: Record<string, string>): T {
      if (!resolver.modifiers?.length) {
        throw new Error(`No modifiers defined, nothing to apply()`);
      }
      if (!Object.keys(values ?? {}).length) {
        throw new Error(`Can’t apply an empty value set`);
      }

      let finalTokens = structuredClone(tokens);

      for (const [name, value] of Object.entries(values)) {
        const modifier = resolver.modifiers.find((mod) => mod.name === name);
        // Note: this should be a validation error sooner
        if (!modifier) {
          throw new Error(`Modifier ${name} not defined!`);
        }
        const modVal = modifier.values.find((v) => v.name === value);
        if (!modVal) {
          throw new Error(`Modifier ${name} has no ${value} defined`);
        }
        for (const id of modVal.values) {
          finalTokens = mergeTokens(finalTokens, getTokens(id as keyof typeof tokenMap));
        }
      }

      return finalTokens;
    },
  };
}
