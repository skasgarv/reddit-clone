module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        160: '40rem'
      },
      container: false,
      searchBox: false
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({addComponents}) {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm' : {maxWidth: '640px'},
          '@screen md' : {maxWidth: '768px'},
          '@screen lg' : {maxWidth: '975px'}
        },
        'searchBox': {
          '@screen sm' : {width: '10rem'},
          '@screen md' : {maxWidth: '30rem'},
          '@screen lg' : {maxWidth: '40rem'}
        }
      })
    }
  ],
}
