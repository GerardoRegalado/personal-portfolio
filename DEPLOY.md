# Deploy Guide (Porkbun + Vercel)

This app is static-only (`outputMode: "static"`).

- Build command: `npm run build`
- Output directory: `dist/portfolio/browser`

`vercel.json` is already configured with:

- Security headers.
- Canonical redirect from `www` to apex.
- SPA fallback rewrite to `index.html`.

## 1) Vercel project setup

1. Import this Git repo in Vercel.
2. Framework preset: Angular (or Other).
3. Confirm:
- Build command: `npm run build`
- Output directory: `dist/portfolio/browser`
4. Deploy once on `*.vercel.app` and verify it loads.

## 2) Add your custom domains in Vercel

Add both:

- `gerardoregalado.dev`
- `www.gerardoregalado.dev`

## 3) DNS records in Porkbun

In Porkbun DNS for `gerardoregalado.dev`, create/update:

- Type `A`, Host `@`, Answer `76.76.21.21`, TTL `600`
- Type `CNAME`, Host `www`, Answer `cname.vercel-dns.com`, TTL `600`

Remove conflicting old records for `@` and `www`.

## 4) HTTPS activation

You do not need to install certificates manually.

When DNS is correct, Vercel issues and renews SSL automatically for both domains.

For `.dev`, HTTPS is mandatory by design, so keep both hosts on valid TLS.

## 5) Verification after DNS propagation

```bash
dig +short gerardoregalado.dev
dig +short www.gerardoregalado.dev
curl -I https://gerardoregalado.dev
curl -I https://www.gerardoregalado.dev
```

Expected:

- `gerardoregalado.dev` resolves to `76.76.21.21`.
- `www` resolves to `cname.vercel-dns.com`.
- Both answer on HTTPS with valid certificate.
- `www` redirects to `https://gerardoregalado.dev`.
