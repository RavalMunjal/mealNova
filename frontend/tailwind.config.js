/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B35', // Deep Saffron
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2D1B69', // Midnight Plum
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#00C896', // Jade Mint
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFF8F0', // Warm Ivory
        },
        dark: {
          bg: '#0D0B1A',
        },
        text: {
          primary: '#1A1A2E',
        },
        // shadcn standard mapping for theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #2D1B69 0%, #FF6B35 60%, #00C896 100%)',
      },
    },
  },
  plugins: [],
}
