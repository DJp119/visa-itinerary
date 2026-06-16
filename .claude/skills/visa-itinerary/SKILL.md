```markdown
# visa-itinerary Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches best practices for developing and maintaining the **visa-itinerary** project, a TypeScript codebase built with the Astro framework. It covers file organization, coding conventions, and testing patterns observed in the repository. By following these guidelines, contributors can ensure consistency and maintainability across the project.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `visaItinerary.ts`, `userProfile.tsx`

### Import Style
- Use **relative imports** for modules within the project.
  ```typescript
  import { getVisaDetails } from './visaDetails';
  ```

### Export Style
- Use **named exports** for functions, types, and components.
  ```typescript
  // visaDetails.ts
  export function getVisaDetails() { ... }
  export type VisaType = { ... }
  ```

### Commit Patterns
- Commits use **freeform messages** with no strict prefixes.
- Average commit message length is short (~8 characters).
  - Example: `fix bug`, `update`, `refactor`

## Workflows

_No explicit workflows detected in the repository._

## Testing Patterns

- **Testing Framework:** Not explicitly identified.
- **Test File Pattern:** Test files are named using the `*.test.*` convention.
  - Example: `visaItinerary.test.ts`
- **Test Example:**
  ```typescript
  // visaItinerary.test.ts
  import { getVisaDetails } from './visaItinerary';

  test('returns correct visa details', () => {
    expect(getVisaDetails('US')).toEqual({ ... });
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /test   | Run all test files matching `*.test.*` |
| /lint   | Lint the codebase for style and errors |
| /build  | Build the Astro project |
```