import sharedConfig from '@sushiswap/tailwindcss-config'

// @ts-check
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: 'class',
  presets: [sharedConfig],
  theme: {
    // screens: {
    //   vs: '425px',
    //   sm: '576px',
    //   md: '768px',
    //   lg: '992px',
    //   xl: '1200px',
    //   xxl: '1440px',
    // },
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover'],
      keyframes: {
        dash: {
          to: {
            'stroke-dashoffset': '0',
          },
        },
      },
    },
  },
}

export default tailwindConfig
