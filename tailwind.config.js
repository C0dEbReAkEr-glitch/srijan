/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#F97316',
              '&:hover': {
                color: '#EA580C',
              },
            },
            '[class~="lead"]': {
              color: '#000000',
            },
            strong: {
              color: '#000000',
            },
            'ul > li::before': {
              backgroundColor: '#D1D5DB',
            },
            hr: {
              borderColor: '#E5E7EB',
            },
            blockquote: {
              color: '#000000',
              borderLeftColor: '#E5E7EB',
            },
            h1: {
              color: '#000000',
            },
            h2: {
              color: '#000000',
            },
            h3: {
              color: '#000000',
            },
            h4: {
              color: '#000000',
            },
            'figure figcaption': {
              color: '#000000',
            },
            code: {
              color: '#000000',
            },
            'a code': {
              color: '#000000',
            },
            pre: {
              color: '#E5E7EB',
              backgroundColor: '#1F2937',
            },
            thead: {
              color: '#000000',
              borderBottomColor: '#9CA3AF',
            },
            'tbody tr': {
              borderBottomColor: '#E5E7EB',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};