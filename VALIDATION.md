# Validation record

Checks completed after the core/UI split:

- core/UI boundary scan;
- syntax transpilation of all 228 TypeScript and TSX inputs across the two repositories (27 core and 201 UI, including scripts, templates, and `next.config.ts`);
- UI integration-adapter and generation-script type-checking against the built core declarations;
- generated Slovenian and English website data loading through the core runtime;
- static routes, localization, SEO, translations, and shared utility smoke checks.

A complete Next.js production build still requires a registry-backed dependency installation. No validation-only declaration stubs or temporary `node_modules` directories are included in this repository.
