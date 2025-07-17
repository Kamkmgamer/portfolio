/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your existing HSL custom properties
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        text: "hsl(var(--text))",
        
        // Define additional semantic colors using direct HSL, HEX, or RGB
        // These can be used for accents, or if you prefer not all colors are HSL variables
        'text-secondary': { // For descriptions or less prominent text
          light: 'hsl(215, 8%, 45%)', // Example: a medium gray
          dark: 'hsl(210, 10%, 65%)', // Example: a lighter gray for dark mode
        },
        primary: { // Your main accent color
          light: 'hsl(217, 91%, 60%)', // Tailwind's blue-500
          dark: 'hsl(174, 76%, 50%)',   // Tailwind's teal-400
        },
        // You can add other specific colors here if needed, e.g., 'danger', 'success'
        // danger: 'hsl(0, 84%, 60%)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      backgroundImage: {
        // Using your existing gradient names for consistency,
        // but now explicitly tying them to light/dark mode for clarity.
        // You could also create CSS variables for these if you prefer.
        'gradient-to-b-section-light': 'linear-gradient(to bottom, var(--background-light-gradient-start, #f8fafc), var(--background-light-gradient-end, #f1f5f9))',
        'gradient-to-b-section-dark': 'linear-gradient(to bottom, var(--background-dark-gradient-start, #1A202C), var(--background-dark-gradient-end, #0F172A))',
        
        // Ensure project-specific gradients are defined or passed dynamically as before.
        // For example, if project.gradient is 'from-blue-500 to-purple-600',
        // those colors would need to be defined in your main `colors` object or be default Tailwind colors.
      },
      boxShadow: {
        'xl-light': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'xl-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        blob: "blob 20s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "scale(1) translate(0px, 0px)" },
          "33%": { transform: "scale(1.1) translate(30px, -50px)" },
          "66%": { transform: "scale(0.9) translate(-20px, 20px)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'), // Add this plugin for the line-clamp utility
  ],
};