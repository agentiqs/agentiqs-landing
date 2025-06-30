# agentiqs.ai landing site

This is the landing page for [agentiqs.ai](https://agentiqs.ai), configured with CI in Netlify.

## Development

Requirements: Node.js & npm (or bun) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

## Build

```sh
# Build for production
npm run build
# or
bun run build
```

## Technologies

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

This site is deployed on Netlify and served at [https://agentiqs.ai](https://agentiqs.ai) from the `main` branch. Any commit pushed to the `main` branch will automatically trigger a redeploy.

## Redirects

The `public/_redirects` file configures URL redirects for the site when deployed on Netlify. This file handles routing for paths that should redirect to external URLs, for example we want `https://agentiqs.ai/docs` to redirect to `https://docs.agentiqs.ai`.

## Lovable Integration

This repository is connected to Lovable, which creates content changes on the `lovable` branch. To integrate these changes into the main branch:

```sh
# Checkout main branch
git checkout main

# Merge lovable branch
git merge lovable

# Review changes and remove any Lovable badges if present
# Check for and remove any "Made with Lovable" badges or similar branding

# Commit the merged changes
git add .
git commit -m "Integrate Lovable changes"

# Push to main
git push origin main
```

**Important**: Always review the changes before committing, especially to remove any Lovable branding or badges that may have been added.
