import { describe, expect, test } from 'vitest';
import { mergeTokenSets } from './set.js';

describe('mergeTokenNodes', () => {
  const TEST_CASES: [
    string,
    (
      | { given: Record<string, any>[]; want: Record<string, any>; error?: never }
      | { given: Record<string, any>[]; want?: never; error: string }
    ),
  ][] = [
    [
      'merges schemas in order',
      {
        given: [
          { color: { red: { $type: 'color', $value: '#ff0000' } } },
          { color: { red: { $type: 'color', $value: '#dd0000' } } },
        ],
        want: {
          color: {
            red: { $type: 'color', $value: '#dd0000' },
          },
        },
      },
    ],
    [
      'combines partial schemas (if they don’t conflict)',
      {
        given: [
          { color: { red: { $type: 'color', $value: '#ff0000' } } },
          { color: { blue: { $type: 'color', $value: '#0000ff' } } },
        ],
        want: {
          color: {
            red: { $type: 'color', $value: '#ff0000' },
            blue: { $type: 'color', $value: '#0000ff' },
          },
        },
      },
    ],
    [
      'accepts a single set',
      {
        given: [{ color: { red: { $type: 'color', $value: '#ff0000' } } }],
        want: { color: { red: { $type: 'color', $value: '#ff0000' } } },
      },
    ],
    [
      'errs on empty array',
      {
        given: [],
        error: 'Must provide at least 1 set to merge',
      },
    ],
    [
      'errs on mismatched schema',
      {
        given: [
          { color: { $type: 'color', $value: '#00ff00' } },
          { color: { $type: 'fontFamily', value: 'Helvetica' } },
        ],
        error: 'Can’t merge $type: color with $type: fontFamily',
      },
    ],
  ];

  test.each(TEST_CASES)('%s', (_testName, { given, want, error }) => {
    if (error) {
      expect(() => mergeTokenSets(given)).toThrowError(error);
    } else {
      expect(mergeTokenSets(given)).toEqual(want);
    }
  });
});
