---
title: Glossary
---

![Resolver spec visual draft](./docs/public/resolver-spec-food-analogy-drawing.jpg)

:::note
Creating tokens is like cooking. You can cook an infinity of dishes (final tokens) by following recipes (sources) which are a combination of different types (dimension) of food (modifiers).
:::

## Token set

A token set is a group of tokens. You have 2 types of token sets:

1. [modifier](#modifier) token sets
2. [source](#source) token sets

## Dimension

Dimensions are categories used to organize your tokens. See them as contexts in which token values might change:

- Brands
- Surface
- Language direction
- Themes
- Platform
- Screen size
- Density
- Component
- State
- Variant
- Contrast
- ...

## Modifier

A modifier token set is a group of token used by source token set(s). You'll usually want to organize them in different [dimensions](#dimension).

![Dimension examples](./docs/public/spectrum-adaptive-ui-concept.png)

## Source

A source set is a combination of one or several modifier set used to match a specific use case. For instance, generating a themes token sets based on several modifier sets.

## Resolver

A design token resolver is a function responsible for creating design tokens respecting [the DTCG spec](https://first-editors-draft.tr.designtokens.org/format/) from another source of data or logic.

## Token space

A single large token set that then forms the final set of tokens you can address with keys like `colors.foo.500`.

## Resolution request

TBD
