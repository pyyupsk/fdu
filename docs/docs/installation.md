# Installation

::: warning BETA VERSION
This package is currently in beta (v0.0.0-beta.1). The API and features may change in future releases.
:::

## Package Manager

Install fdu using your preferred package manager:

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

## CDN

You can also use fdu directly from a CDN:

```html
<!-- ESM -->
<script type="module">
  import { fdu } from "https://esm.sh/@pyyupsk/fdu";
  console.log(fdu().format("YYYY-MM-DD"));
</script>

<!-- UMD (coming soon) -->
```

## TypeScript

fdu is written in TypeScript and includes type definitions out of the box:

```typescript
import { fdu, type FduInstance, type LocaleConfig } from "@pyyupsk/fdu";

const date: FduInstance = fdu("2025-09-30");
```

## Requirements

- **Node.js**: 18+
- **Bun**: 1.x+
- **Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

## Next Steps

- [Getting Started](/docs/getting-started) - Learn the basics
- [API Reference](/docs/api-reference/creation/fdu) - Explore the full API
