---
title: Type Interface
---

```ts
interface Set {
  name: string;
  values: string[];
}

interface Modifier {
  name?: string;
  values: Array<{
    name: string;
    values: string[];
  }>;
  meta?: Record<string, unknown>;
}

export interface Resolver {
  name?: string;
  description?: string;
  sets: Set[];
  modifiers: Modifier[];
}
```
