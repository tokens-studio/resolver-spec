---
title: Example
---

```json5
{
  /*
   * Optional name of a resolver
   */
  name: 'Preset resolver',
  /*
   * Optional description
   */
  description: 'This handles the preset from Figma tokens',
  /*
      * A series of sets. The values of the tokens within these sets will
      correspond with the names of the outputted tokens.

      The order of these tokens is important. If keys for tokens are defined within them, the last token will be
      the effective value used
      */
  sets: [
    {
      // An optional override of the name of the set. Can be used when tracing the resolution logic or when using `include` modifiers. Read further to see an include modifier in action
      name: 'first',
      // A reference to the tokens. This could vary depending on whether the resolution is occuring through the file system or in memory
      // In this example we assume through the file system through a relative file called core.json
      values: ['foundation.json'],
    },
    {
      values: ['semantic.json'],
    },
    {
      values: ['button.json'],
    },
  ],
  /*
      * These modifiers act as "libraries" that are "imported" 
         and referencable by themselves and the source set
      */
  modifiers: [
    {
      name: 'theme',
      //Default value of the modifier
      default: 'light',
      //Optional parameter to rename the set prior to resolution
      alias: 'theme',
      //Identifies the modifier type. In this case it is an enumerated value with named key value pairs
      type: 'enumerated',
      values: [
        {
          name: 'light',
          values: ['light.json'],
        },
        {
          name: 'dark',
          values: ['dark.json'],
        },
      ],
    },
    {
      name: 'core',
      // Potential optional parameter to hide this modifier in software that visualizes the resolver
      hidden: true,
      default: 'core',
      type: 'enumerated',
      values: [
        {
          name: 'core',
          values: ['core.json'],
        },
      ],
    },
  ],
}
```

:::note
In the above example json specification since we do not allow arbitrary values, we have left out using the `$` prefix on properties as is used in the token spec.
:::

For visual thinkers the following is in effect

![Resolver image](/resolvers.png)
