/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
      "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    }
 }
  ,
  plugins: [ require('flowbite/plugin'),
  require("daisyui"),require('flowbite/plugin')],
  daisyui:{
    darkTheme:"light",
    base:false
  }
}