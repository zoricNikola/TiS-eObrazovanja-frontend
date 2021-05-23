const colors = require('tailwindcss/colors');

module.exports = {
  prefix: "",
  purge: {
    enabled: false,
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        perfectDark: {
          DEFAULT: '#323334',
        },
        orange: colors.orange,
        violet: colors.violet,
        coolGray: colors.coolGray,
      },
      minHeight: {
        '10': '2.5rem',
        '12': '3rem',
        '1/4': '25%'
      },
      minWidth: {
        '10': '2.5rem',
        '1/4': '25%'
      },
      maxHeight: {
        '10': '2.5rem',
        '3/4': '75%'
      },
      maxWidth: {
        '10': '2.5rem',
        '3/4': '75%'
      },
      margin: {
        '1/12': '8.333333%'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      display: ['hover', 'group-hover'],
      borderWidth: ['focus'],
      opacity: ['disabled'],
      borderRadius: ['first', 'last']
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
