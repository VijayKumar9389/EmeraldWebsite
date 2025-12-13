module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // point to all your source files
        "./public/index.html",        // include HTML if needed
    ],
    theme: {
        extend: {
            colors: {
                // === PRIMARY COLORS ===
                'primary-color': '#1CC88A',            // Vibrant orange-red for primary actions (energy & visibility)
                'background-color': '#f5f5f5',        /* very soft light gray, cleaner than pure off-white */
                'background-alt-color': '#e0e0e0',    /* subtle mid-gray for cards or sections */
                'background-muted': '#e5e5e5',
                'text-color': '#1a1a1a',              // Normal text: dark gray, softer than black
                'text-light': '#555555',              // Secondary / muted text: medium gray

            }
        },
    },
    plugins: [],
};