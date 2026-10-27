import { defineConfig } from 'vite-plus'

// Config de Vite+ para lint, formato, chequeo de tipos, tareas y hooks.
// Astro no lee este archivo: dev y build siguen en astro.config.mjs
export default defineConfig({
  lint: {
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react'],
    ignorePatterns: ['dist/**', '.astro/**'],
    rules: {
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'warn',
      // Los componentes se renderizan una vez en el build (sitio estático):
      // `new Date()` en el render no cambia entre renders
      'react/purity': 'off',
    },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    singleQuote: true,
    semi: false,
    printWidth: 80,
    astro: true,
    sortTailwindcss: { stylesheet: './src/styles/tailwind.css' },
    ignorePatterns: [
      'dist/**',
      '.astro/**',
      'pnpm-lock.yaml',
      'package-lock.json',
    ],
  },
  run: {
    tasks: {
      build: {
        command: 'astro build',
        // .astro/ son tipos que Astro regenera en cada build
        cache: {
          input: [{ auto: true }, '!.astro/**', '!dist/**'],
          output: ['dist/**'],
        },
      },
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
})
