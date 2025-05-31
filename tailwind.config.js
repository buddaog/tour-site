/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef3f8',
          100: '#d4e0ec',
          200: '#bacde0',
          300: '#9fb9d4',
          400: '#85a6c8',
          500: '#6a93bc',
          600: '#5080b0',
          700: '#356ca4',
          800: '#1a5998',
          900: '#1a365d',
        },
        secondary: {
          50: '#f9f6f1',
          100: '#f2eee3',
          200: '#e6ddc7',
          300: '#d9ccab',
          400: '#cdbb8f',
          500: '#c4a777',
          600: '#b89660',
          700: '#ac8549',
          800: '#a07332',
          900: '#94621b',
        },
        success: {
          100: '#dcf5e7',
          500: '#10b981',
          900: '#064e36',
        },
        warning: {
          100: '#fef5e7',
          500: '#f59e0b',
          900: '#7c4a03',
        },
        error: {
          100: '#fee2e2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg')",
      },
    },
  },
  plugins: [],
};