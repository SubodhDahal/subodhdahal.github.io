import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md',
  ],
  darkMode: 'class',

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
            h1: {
              fontFamily: 'Source Serif Pro, serif',
              fontWeight: '700',
              marginBottom: '1.5rem'
            },
            h2: {
              fontFamily: 'Source Serif Pro, serif',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          },
        },
      },
      colors: {
        primary: '#d8002d',
        secondary: '#333',
        dark: '#091a28',
        elevated: '#dfe8ef',
        linkExactActiveClass: '#fd213b',
        blog: {
          text: {
            light: '#374151', // gray-700
            dark: '#d1d5db'   // gray-300
          },
          bg: {
            light: '#ffffff',
            dark: '#111827'   // gray-900
          }
        }
      },
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        serif: ['Source Serif Pro', ...defaultTheme.fontFamily.serif],
        display: ['Samble Tracie', 'cursive']
      },
      margin: {
        'top-bar': '100px',
      },
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
