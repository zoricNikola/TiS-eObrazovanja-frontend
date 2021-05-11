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
        '10': '2.5rem'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      display: ['hover', 'group-hover'],
      borderWidth: ['focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
