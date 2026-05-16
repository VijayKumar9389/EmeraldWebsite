module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                // === PREMIUM COLOR PALETTE ===
                // Primary - Elegant Emerald Green
                'primary': {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
                // Accent - Warm Gold for luxury accents
                'accent': {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                // Neutral - Refined grays with warm undertones
                'neutral': {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
                // Legacy support (mapped to new system)
                'primary-color': '#059669',
                'background-color': '#fafafa',
                'background-alt-color': '#f5f5f5',
                'background-muted': '#e5e5e5',
                'text-color': '#171717',
                'text-light': '#525252',
            },
            fontFamily: {
                'heading': ['var(--font-playfair)', 'Georgia', 'serif'],
                'body': ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'sans': ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'display': ['var(--font-playfair)', 'Georgia', 'serif'],
            },
            fontSize: {
                'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
                'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
                'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
                'display-xs': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
                'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                'glow': '0 0 20px rgba(5, 150, 105, 0.15)',
                'glow-lg': '0 0 40px rgba(5, 150, 105, 0.2)',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-premium': 'linear-gradient(135deg, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
