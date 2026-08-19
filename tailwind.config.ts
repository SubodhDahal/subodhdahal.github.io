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
            color: '#374151',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'pre code::before': { content: 'none' },
            'pre code::after': { content: 'none' },
            h1: {
              fontFamily: 'Newsreader, serif',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.2',
              color: '#111827',
              marginBottom: '2rem',
              letterSpacing: '-0.025em'
            },
            h2: {
              fontFamily: 'Newsreader, serif',
              fontWeight: '700',
              fontSize: '1.875rem',
              lineHeight: '1.3',
              color: '#1F2937',
              marginTop: '2.5rem',
              marginBottom: '1.25rem'
            },
            h3: {
              fontFamily: 'Newsreader, serif',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              color: '#374151',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            p: {
              fontFamily: 'Newsreader, serif',
              marginTop: '1.25rem',
              marginBottom: '1.25rem'
            },
            'ul': {
              listStyleType: 'disc',
              paddingLeft: '1.625em'
            },
            'ul > li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingLeft: '0.375em'
            },
            blockquote: {
              fontFamily: 'Newsreader, serif',
              fontStyle: 'italic',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#E5E7EB',
              paddingLeft: '1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              color: '#4B5563'
            },
            'blockquote p:first-of-type::before': {
              content: 'none'
            },
            'blockquote p:last-of-type::after': {
              content: 'none'
            },
            a: {
              color: '#BE123C',  // primary-700 — rose link (matches link-rose system)
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: '#E11D48',  // primary-600
                textDecoration: 'none',
                backgroundColor: 'transparent'
              }
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            figcaption: {
              fontSize: '0.875rem',
              lineHeight: '1.4',
              color: '#6B7280',
              marginTop: '0.5rem',
              fontStyle: 'italic'
            },
            code: {
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#BE123C',  // rose-700
              backgroundColor: '#FFF1F3',  // rose-50
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            'pre code': {
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: 'inherit'
            },
            pre: {
              fontFamily: 'IBM Plex Mono, monospace',
              backgroundColor: '#1F2937',
              color: '#F3F4F6',
              padding: '1.25rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem'
            }
          },
        },
        // Dark mode typography
        invert: {
          css: {
            color: '#D1D5DB',
            h1: { color: '#F3F4F6' },
            h2: { color: '#E5E7EB' },
            h3: { color: '#D1D5DB' },
            blockquote: {
              color: '#9CA3AF',
              borderLeftColor: '#374151'
            },
            a: {
              color: '#FDA4B4',  // primary-300 — rose link on dark
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: '#FB7185',  // primary-400
                textDecoration: 'none',
                backgroundColor: 'transparent'
              }
            },
            figcaption: {
              color: '#9CA3AF'
            },
            code: {
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#FDA4B4',  // rose-300
              backgroundColor: '#4C0519'  // rose-950
            }
          }
        }
      },
      colors: {
        primary: {
          50: '#FFF1F3',
          100: '#FFE4E8',
          200: '#FECDD6',
          300: '#FDA4B4',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          950: '#4C0519'
        },
        secondary: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712'
        },
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22'
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Newsreader', ...defaultTheme.fontFamily.serif],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
        display: ['Samble Tracie', 'cursive']
      },
      margin: {
        'top-bar': '100px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
