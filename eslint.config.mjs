import eslintPluginAstro from 'eslint-plugin-astro'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist/', '.astro/', '.vercel/']),
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  eslintPluginAstro.configs.recommended,
  // El proyecto usa `let` por convención (heredada del template Spotlight)
  { rules: { 'prefer-const': 'off' } },
])
