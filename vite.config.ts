import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Проектный сайт GitHub Pages отдаётся с https://<user>.github.io/<repo>/,
  // поэтому все ссылки на ассеты должны быть с префиксом имени репозитория.
  base: '/ofz/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});
