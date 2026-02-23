# KyroWTF 🎬

A Netflix-style streaming frontend powered by TMDB + VidKing.

## 🚀 Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages via Actions

In your repo on GitHub:
1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. That's it — the workflow in `.github/workflows/deploy.yml` handles the rest!

Every push to `main` will automatically build and deploy the site.

### ⚠️ Project Site vs Root Site

- **Root site** (`username.github.io`): `base` in `vite.config.ts` is already set to `/` ✅
- **Project site** (`username.github.io/repo-name`): Edit `vite.config.ts` and change:
  ```ts
  const BASE = "/your-repo-name/";
  ```

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

The app runs entirely client-side and fetches directly from TMDB — no backend needed.

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **TailwindCSS** + **shadcn/ui** + **Framer Motion**
- **TMDB API** for movie/show metadata
- **VidKing** for video embedding
- **GitHub Actions** for CI/CD
