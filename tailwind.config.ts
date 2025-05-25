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
              fontFamily: 'Source Serif Pro, serif',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.2',
              color: '#111827',
              marginBottom: '2rem',
              letterSpacing: '-0.025em'
            },
            h2: {
              fontFamily: 'Source Serif Pro, serif',
              fontWeight: '700',
              fontSize: '1.875rem',
              lineHeight: '1.3',
              color: '#1F2937',
              marginTop: '2.5rem',
              marginBottom: '1.25rem'
            },
            h3: {
              fontFamily: 'Source Serif Pro, serif',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              color: '#374151',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            p: {
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
              color: '#2563EB',  // blue-600
              textDecoration: 'none !important',
              fontWeight: '500',
              borderBottom: '1px solid #2563EB',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: '#1D4ED8',  // blue-700
                borderBottom: '1px solid #1D4ED8',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                textDecoration: 'none !important'
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
              color: '#DC2626',  // red-600
              backgroundColor: '#FEF2F2',  // red-50
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            'pre code': {
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: 'inherit'
            },
            pre: {
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
              color: '#60A5FA',  // blue-400
              textDecoration: 'none !important',
              borderBottom: '1px solid #60A5FA',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: '#93C5FD',  // blue-300
                borderBottom: '1px solid #93C5FD',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                textDecoration: 'none !important'
              }
            },
            figcaption: {
              color: '#9CA3AF'
            },
            code: {
              color: '#F87171',  // red-400
              backgroundColor: '#991B1B'  // red-800
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
