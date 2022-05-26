module.exports = {
  content: ['./src/page/Register/Register.jsx',
            './src/page/Login/Login.jsx',
            './src/page/Checkout/Checkout.jsx',
            './src/templates/AdminTemplate/AdminTemplate.jsx',
            './src/page/Admin/Film/Film.jsx',
            './src/page/Admin/User/User.jsx',
            './src/page/Admin/User/EditUser.jsx'
          ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
}
