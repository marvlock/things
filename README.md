# Things

Things is an open-source collection of accessible, neobrutalist React components built with Tailwind CSS. Copy a component into your project, customize it, or install it from the registry.

- Documentation: [things.marvlock.com/docs](https://things.marvlock.com/docs)
- Component registry: [things.marvlock.com/registry/index.json](https://things.marvlock.com/registry/index.json)
- AI-readable documentation: [things.marvlock.com/llms.txt](https://things.marvlock.com/llms.txt)

## Use a component

Initialize shadcn in your destination project, then install a component from Things:

```bash
npx shadcn@latest add https://things.marvlock.com/registry/ui/button.json
```

## Develop locally

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run check
```

## Repository guide

See [AGENTS.md](./AGENTS.md) for architecture, accessibility, registry, and validation conventions used by human contributors and coding agents.

## License

MIT
