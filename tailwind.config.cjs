/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './build/*.html',
    './client/components/*.{js,jsx}',
    './index.html',
    './index.js',
  ],
  daisyui: {
    theme: ['light'],
  },
  plugins: [require('daisyui')],
};
