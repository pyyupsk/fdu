## Description

<!-- Provide a clear and concise description of what this PR does -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that causes existing functionality to change)
- [ ] 📝 Documentation update
- [ ] 🎨 Code style/formatting (no functional changes)
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ⚡️ Performance improvement
- [ ] ✅ Test updates
- [ ] 🌍 Locale addition/update
- [ ] 🔧 Build/CI configuration
- [ ] 🔌 Plugin development

## Related Issues

<!-- Link related issues using keywords: Fixes #123, Closes #456, Related to #789 -->

Fixes #

## Changes Made

<!-- List the key changes in this PR -->

-
-
-

## Motivation and Context

<!-- Why is this change required? What problem does it solve? -->

## Screenshots/Benchmarks

<!-- If applicable, add screenshots or benchmark results -->

### Before

```
<!-- Previous behavior or performance -->
```

### After

```
<!-- New behavior or performance -->
```

## Testing

<!-- Describe the tests you've added or run -->

### Test Coverage

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Benchmarks added/updated
- [ ] All existing tests pass (`bun run test`)
- [ ] Coverage thresholds met (`bun run test:coverage`)
  - Lines: ≥99%
  - Functions: 100%
  - Branches: ≥96%
  - Statements: ≥99%

### Manual Testing

<!-- Describe manual testing performed -->

- [ ] Tested in Node.js (version: \_\_\_)
- [ ] Tested in Bun (version: \_\_\_)
- [ ] Tested in Browser (browser: \_\_\_)
- [ ] Tested with CommonJS (`require`)
- [ ] Tested with ESM (`import`)

## Constitutional Compliance

<!-- Confirm adherence to project principles (see CONTRIBUTING.md) -->

- [ ] ✅ **Zero Dependencies**: No new runtime dependencies added
- [ ] ⚡️ **Performance**: No performance regressions (`bun run bench`)
- [ ] 🌳 **Tree-Shakeable**: Code is side-effect free
- [ ] 📏 **Minimal API**: New APIs are justified and necessary
- [ ] 🎯 **Modern Standards**: Uses ES2020+ features, targets Node.js 20+
- [ ] 🧪 **Testing Discipline**: Tests written before/with implementation
- [ ] 🔒 **Type Safety**: No `any` types in public APIs, strict mode compliant

## Code Quality Checklist

- [ ] Code follows project style (passes `bun run lint`)
- [ ] Types are strict (passes `bun run typecheck`)
- [ ] Build succeeds (passes `bun run build`)
- [ ] JSDoc comments added for public APIs
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] README.md updated (if applicable)
- [ ] CHANGELOG.md updated (if applicable)
- [ ] Documentation updated (if user-facing changes)

## Breaking Changes

<!-- If this is a breaking change, describe: -->
<!-- 1. What breaks -->
<!-- 2. Migration path for users -->
<!-- 3. Why the breaking change is necessary -->

**Breaking changes**: No / Yes

If yes, describe:

## Performance Impact

<!-- For performance-sensitive changes, include benchmark comparisons -->

| Operation | Before     | After      | Improvement |
| --------- | ---------- | ---------- | ----------- |
| Example   | 1.0M ops/s | 2.0M ops/s | 2× faster   |

## Bundle Size Impact

<!-- If applicable, show bundle size changes -->

| Format                   | Before | After  | Change  |
| ------------------------ | ------ | ------ | ------- |
| ESM (minified + gzipped) | 8.0 KB | 8.2 KB | +0.2 KB |

## Additional Notes

<!-- Any additional information reviewers should know -->

## Reviewer Checklist

<!-- For maintainers reviewing this PR -->

- [ ] Code review completed
- [ ] Tests are comprehensive and passing
- [ ] Documentation is clear and complete
- [ ] No security vulnerabilities introduced
- [ ] Performance benchmarks reviewed
- [ ] Breaking changes justified and documented
- [ ] Follows project architecture patterns
- [ ] Ready to merge

---

<!-- Thank you for contributing to @pyyupsk/fdu! 🎉 -->
