import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
 * Project-сайт на GitHub Pages живёт по адресу https://<owner>.github.io/<repo>/,
 * поэтому ассеты должны собираться с префиксом /<repo>/ — иначе стили, шрифты и
 * картинки отдадут 404. Имя берём из окружения Actions (GITHUB_REPOSITORY =
 * "owner/repo"), локально переменной нет и база остаётся "/".
 * Если подключите собственный домен или это user-site (<owner>.github.io),
 * сайт живёт в корне — там base должен быть "/".
 */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = !repo || repo.endsWith(".github.io") ? "/" : `/${repo}/`;

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
