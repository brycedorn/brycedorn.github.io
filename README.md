# [bryce.io](https://www.bryce.io)

A single-page personal site built with Qwik and QwikCity, prerendered to static files and hosted on GitHub Pages.

## Development

```shell
npm start
```

Dev mode server-side renders with Vite's dev server. It requests many `.js` files, so it is not representative of a production build.

## Preview

```shell
npm run preview
```

Builds the client and `src/entry.preview.tsx`, then serves them locally. For convenience only, not a production server.

## Production

```shell
npm run build
```

Type checks, lints, and writes the static site to `dist/`. Pushing to `master` runs the GitHub Actions workflow, which builds and publishes `dist/` to the `deploy` branch served by GitHub Pages. Fonts are self-hosted from `public/fonts`, and the custom domain comes from `public/CNAME`.
