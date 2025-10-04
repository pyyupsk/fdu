---
layout: home

hero:
  name: "fdu"
  text: "Faster Date-Time Utility"
  tagline: Ultra-fast, zero-dependency JavaScript date-time library
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: API Reference
      link: /docs/api-reference/creation/fdu
    - theme: alt
      text: View on GitHub
      link: https://github.com/pyyupsk/fdu

features:
  - icon: ⚡
    title: 2x Faster
    details: Optimized for performance, benchmarked at 2x faster than Day.js
  - icon: 🔒
    title: Zero Dependencies
    details: No external dependencies. Lightweight and secure.
  - icon: 💪
    title: TypeScript-First
    details: Built with TypeScript, providing excellent type safety and IntelliSense
  - icon: 🌍
    title: 11 Locales Built-in
    details: Support for English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, and Thai
  - icon: ✅
    title: 97%+ Test Coverage
    details: Thoroughly tested with comprehensive test suite
  - icon: 🎯
    title: Simple API
    details: Intuitive and familiar API inspired by popular date libraries
---

::: warning BETA VERSION
This package is currently in beta (v0.0.0-beta.1). The API and features may change in future releases. Use with caution in production environments.
:::

## Quick Start

::: code-group

```bash [npm]
npm install @pyyupsk/fdu
```

```bash [pnpm]
pnpm add @pyyupsk/fdu
```

```bash [yarn]
yarn add @pyyupsk/fdu
```

```bash [bun]
bun add @pyyupsk/fdu
```

:::

```typescript
import { fdu } from "@pyyupsk/fdu";

const now = fdu();
const date = fdu("2025-09-30");

console.log(date.format("MMMM DD, YYYY")); // September 30, 2025
```

## Why fdu?

- **Performance**: 2x faster than Day.js in benchmarks
- **Size**: Tiny footprint with zero dependencies
- **Modern**: Built for modern JavaScript/TypeScript projects
- **Reliable**: High test coverage ensures stability
- **Familiar**: Easy to learn if you've used Day.js or Moment.js

## Browser Support

fdu supports all modern browsers and Node.js environments:

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Node.js 18+
- Bun 1.x+

## License

MIT © [Pongsakorn Thipayanate](https://github.com/pyyupsk)
