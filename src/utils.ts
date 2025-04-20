/** Everything is an object in JS */
export function printType(node: unknown): string {
  return Array.isArray(node) ? 'Array' : typeof node;
}

/**
 * This is a simple merge function, but will throw some validation errors if
 * two schemas don’t align
 */
export function mergeTokens(a: unknown, b: unknown) {
  // Note: “null” probably shouldn’t happen but allow it, as it could be an
  // implementation detail upstream loading the tokens

  // Null/undefined: if one set is missing this tree, take the other
  if (a === null || a === undefined) {
    return b;
  }
  if (b === null || b === undefined) {
    return a;
  }

  // Mismatch: throw error (since null cases have been handled)
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error(`Can’t merge type ${printType(a)} with type ${printType(b)}`);
  }

  // Arrays: replace a -> b
  if (Array.isArray(a)) {
    return structuredClone(b);
  }

  // Objects: merge groups, replace tokens (unless they mismatch)
  if (typeof a === 'object' && typeof b === 'object') {
    if ('$type' in a && '$type' in b && a.$type !== b.$type) {
      throw new Error(`Can’t merge $type: ${a.$type} with $type: ${b.$type}`);
    }

    // Tokens: replace a -> b
    const isToken = '$value' in a;
    if (isToken) {
      // TODO: we’re not validating the token schema
      return structuredClone(b);
    }

    // Groups: merge keys
    const newGroup: any = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of [...keys]) {
      newGroup[k] = mergeTokens((a as Record<string, any>)[k], (b as Record<string, any>)[k]);
    }
    // TODO: $extensions may get a little weird, should that one be merged or not?
    return newGroup;
  }

  // Everything else: return b
  return b;
}
