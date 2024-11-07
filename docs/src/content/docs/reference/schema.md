---
title: Schema
---

```json
{
  "$id": "https://schemas.tokens.studio/prototype/resolver.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Resolver Specification",
  "$defs": {
    "tokenSet": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["values"]
    },
    "modifier": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "values": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": ["name", "values"]
          }
        },
        "meta": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": ["name", "values"]
    }
  },
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "sets": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/tokenSet"
      }
    },
    "modifiers": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/modifier"
      }
    }
  },
  "required": ["sets", "modifiers"]
}
```
