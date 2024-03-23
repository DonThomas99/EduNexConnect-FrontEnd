// postcss.config.js
module.exports = {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {}, // Ensure this is before tailwindcss
      tailwindcss: {},
      autoprefixer: {},
    }
  }
  