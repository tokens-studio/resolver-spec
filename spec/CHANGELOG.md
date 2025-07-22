# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2023-10-27

This is the first major revision of the specification based on a detailed technical review. The goal of this release is to add clarity, address ambiguities, and provide a more robust foundation for implementers.

### Added

-   **"Include" Modifier Type:** Added a new `include` type for modifiers, which is used to conditionally include a set of tokens. An example has been added to the "Modifiers" section.
-   **Order of Precedence:** A new subsection, "Order of Precedence," has been added to the "Resolution Logic" section to explicitly define the merge order for base sets and modifiers.
-   **Error Handling Guidance:** A new informative section, "Error Handling," has been added to recommend specific error types for common failure scenarios (e.g., `FileNotFoundError`, `CircularReferenceError`).

### Changed

-   **Modifier Type:** The `type` property on modifiers now defaults to `"enumerated"`.
-   **Inline Token Definitions:** Clarified that an "inline token definition" must be a complete JSON object representing a valid token structure. An example has been added to the "Token Sets" section.
-   **Final Output Format:** The specification now explicitly states that the final resolved output should be a nested JSON object that mirrors the token paths, as shown in the examples.
-   **Path Resolution:** It is now explicitly stated that file paths in a resolver file must be resolved relative to the location of the resolver file itself.
-   **Alias Resolution Scope:** The spec now clarifies that alias resolution is performed on the fully merged set of tokens, allowing aliases to reference tokens across any loaded file.
-   **`meta.alias` Behavior:** The behavior of `meta.alias` is now more clearly defined, explaining that it namespaces the tokens from the modifier's files and that external references must use this namespace.

### Fixed

-   **Inconsistent `\$value` Key:** Corrected all instances of an inconsistent `value` key in JSON examples to use `\$value`, aligning with the Design Tokens Format Specification.