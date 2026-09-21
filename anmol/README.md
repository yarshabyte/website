# Anmol Chhetri — CMO Portfolio | YarshaByte

Standalone web application and portfolio for **Anmol Chhetri** (Chief Marketing Officer at YarshaByte), designed to mirror the design system, typography, and styling of [yarshabyte.com](https://yarshabyte.com).

## Cloudflare Deployment Setup

This folder is configured to deploy seamlessly to Cloudflare via either **Cloudflare Pages** or **Cloudflare Workers (with Static Assets)**:

- **Root directory**: `anmol`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Framework preset**: `Vite` (or `None`)
- **Deploy command (if using Wrangler)**: `npx wrangler deploy`

The included `wrangler.jsonc` and `wrangler.json` are pre-configured with:
```json
{
  "name": "anmol",
  "compatibility_date": "2026-09-21",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```
This ensures Wrangler never prompts during CI builds and resolves the `assets.directory` requirement automatically.

### Connecting to Custom Subdomain:
1. In Cloudflare Dashboard, go to **Workers & Pages**.
2. Connect to Git repo `yarshabyte/website`.
3. Set **Root directory** to `anmol`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add custom domain: `anmol.yarshabyte.com`.

## Local Development

```bash
cd anmol
npm install
npm run dev      # Start dev server with hot reload
npm run build    # Build static bundle to dist/
npm run preview  # Preview production build locally
```
