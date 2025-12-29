import { Code2, Globe, Package, Shield, Sparkles, Zap } from "lucide-react";

export const features = [
  {
    icon: Zap,
    title: "4× Faster Performance",
    description:
      "19.6M comparison operations per second. 13× faster comparisons, 6× faster chained operations than Day.js.",
  },
  {
    icon: Package,
    title: "Zero Dependencies",
    description:
      "100% self-contained TypeScript implementation. No bloat, no supply chain risks, minimal bundle size.",
  },
  {
    icon: Globe,
    title: "20+ Locales Built-in",
    description:
      "Internationalization covering 4.3B+ speakers. Tree-shakeable locale files (300-500 bytes gzipped each).",
  },
  {
    icon: Shield,
    title: "Immutable by Default",
    description:
      "Every operation returns a new instance, preventing subtle mutation bugs in your application.",
  },
  {
    icon: Code2,
    title: "TypeScript-First",
    description:
      "Full IntelliSense support with strict type safety. No any types in public APIs.",
  },
  {
    icon: Sparkles,
    title: "98%+ Test Coverage",
    description:
      "Rigorously tested with 20+ test files. CI pipeline on Node 20.x, 22.x, and 23.x.",
  },
];
