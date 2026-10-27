/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  // prettier-plugin-tailwindcss tiene que ir último
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
}
