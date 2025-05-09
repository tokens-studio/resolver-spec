import type { DTCGTokens } from './types.js';
import { mergeTokens } from './utils.js';

/**
 * Merge token sets into one, in order
 */
export function mergeTokenSets<T extends Record<string, any> = DTCGTokens>(sets: T[]): T {
  if (!sets.length) {
    throw new Error('Must provide at least 1 set to merge');
  }
  if (sets.length === 1) {
    return sets[0];
  }
  let finalTokens: T = mergeTokens(sets[0], sets[1]);
  for (const nextSet of sets.slice(2)) {
    finalTokens = mergeTokens(finalTokens, nextSet);
  }
  return finalTokens;
}

type TokenStub = { $type: string; $value: any }; // don’t use this outside this file
