---
title: Theme Resolver Spec
---

The theme resolver spec aims to standardize the way in which multiple Design Tokens sets can be combined and how themability applies to these tokensets.

It is proposed to be an additional module within [Design Token Community Group draft specification](https://tr.designtokens.org/), e.g. [Format](https://tr.designtokens.org/format/) module defines a single design token file.

Multiple design token files have two main purposes:

- Grouping tokens by category (arbitrary)
- Create theme-specific token overrides

## Grouping by category

This can be any arbitrary type of token categorization, one commonly used split is:

- Primitive / global design tokens not meant for direct usage
- Semantic design tokens that consume/reference from primitives/globals, and are meant for usage in applications or UI components
- Component tokens that are specific to UI components

---

## Theme-specific overrides

Another purpose for having multiple sets of tokens is to create token overrides.
This means that the same tokens can be defined in multiple tokensets, for example:

`light.json`:

```json
{
  "semantic": {
    "foregroundColor": {
      "$type": "color",
      "primary": {
        "$value": "{colors.red.700}"
      }
    }
  }
}
```

`dark.json`:

```json
{
  "semantic": {
    "foregroundColor": {
      "$type": "color",
      "primary": {
        "$value": "{colors.red.400}"
      }
    }
  }
}
```

Depending on the current theme (e.g. `light` vs `dark` mode), the token will have a different resolved value.

In order for this to work, we need to:

- Define what the theming dimensions are
- Within those dimensions what variants (we refer to these as theme modifiers) exist
- Which tokensets are specific to which modifiers

---

This specification aims at addressing these things, by defining the sets and the modifiers, and which sets apply to which modifiers.

Links:

- [Spec JSON schema](/reference/schema)
- [Spec TS Interface (coming soon)](/reference/interface)
- [Example using the spec](/reference/example)
