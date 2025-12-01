import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: For GitHub Pages, set `base` to `'/REPO_NAME/'` (including the slashes),
// where REPO_NAME is the name of your GitHub repository.
// Example: if your repo is `om-patole/portfolio`, set base: '/portfolio/'.
export default defineConfig({
  base: '/Portfoliov2/', // TODO: change this if your repo name is different
  plugins: [tailwindcss(), react()],
})
