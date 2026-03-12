# Portfolio

Static-only Angular 20 portfolio (no SSR runtime).

## Local development

Use Node `20.19+` and run:

```bash
npm install
npm run start
```

## Production build

```bash
npm run build
```

The static artifacts are generated in:

`dist/portfolio/browser`

## Deployment

See [DEPLOY.md](./DEPLOY.md) for DNS records, custom domain setup, HTTPS checks, and go-live checklist.
