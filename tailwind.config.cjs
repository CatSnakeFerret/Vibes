/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './build/*.html',
    './client/components/*.{js,jsx}',
    './index.html',
    './index.js',
  ],
  daisyui: {
    themes: [
      {
        spotify: {
          primary: '#1DB954',

          secondary: '#b68ad8',

          accent: '#f9b3e9',

          neutral: '#27242d',

          'base-100': '#191414',

          info: '#7bc9ea',

          success: '#125930',

          warning: '#fba22d',

          error: '#eb7575',
        },
      },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
  plugins: [require('daisyui')],
};
