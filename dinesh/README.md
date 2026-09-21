# Dinesh Lamichhane — COO Portfolio | YarshaByte

Standalone web application and portfolio for **Dinesh Lamichhane** (Chief Operating Officer at YarshaByte), designed to mirror the design system, typography, and styling of [yarshabyte.com](https://yarshabyte.com).

## Cloudflare Deployment Setup

This folder is configured to deploy seamlessly to Cloudflare via either **Cloudflare Pages** or **Cloudflare Workers (with Static Assets)**:

- **Root directory**: `dinesh`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Framework preset**: `Vite` (or `None`)
- **Deploy command (if using Wrangler)**: `npx wrangler deploy`

The included `wrangler.jsonc` and `wrangler.json` are pre-configured with:
```json
{
  "name": "dinesh",
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
3. Set **Root directory** to `dinesh`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add custom domain: `dinesh.yarshabyte.com`.

## Local Development

```bash
cd dinesh
npm install
npm run dev      # Start dev server with hot reload
npm run build    # Build static bundle to dist/
npm run preview  # Preview production build locally
```
