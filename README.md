# ТПУ — лендинг «Ваш вызов, наша компетенция»

React + TypeScript + Vite + Tailwind CSS 4, шрифт ALS Sirius.

## Локальный запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production-сборка в dist/
npm run preview  # проверка собранной версии
```

## Деплой на GitHub Pages

Сайт собирается и публикуется workflow `.github/workflows/deploy.yml`: на каждый
пуш в `master` или `v2`, а также вручную — **Actions → Deploy to GitHub Pages → Run workflow**.
Папка `dist` в репозиторий не коммитится, Pages получает её артефактом.

Что включить один раз в настройках репозитория:

1. **Settings → Pages → Build and deployment → Source: `GitHub Actions`.**
2. Права в **Settings → Actions → General → Workflow permissions** менять не нужно:
   workflow сам запрашивает `pages: write` и `id-token: write`.

Адрес сайта: `https://<owner>.github.io/ofz/` (у нас — `https://vangog10.github.io/ofz/`).

Префикс пути `/ofz/` сборка берёт из переменной окружения `GITHUB_REPOSITORY`
(см. `vite.config.ts`), поэтому локальные `npm run dev` и `npm run preview`
работают от корня. Если появится свой домен или user-site `<owner>.github.io`,
сайт переедет в корень — тогда в `vite.config.ts` нужно жёстко поставить `base: "/"`.

## Шаблон Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
