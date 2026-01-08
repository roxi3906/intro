/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'tech-start': '#a5f3fc',
        'tech-end': '#c4b5fd',
        'idea-start': '#fecdd3',
        'idea-end': '#fcd34d',
        'know-start': '#bbf7d0',
        'know-end': '#a5f3fc',
      },
      backgroundImage: {
        // Multi-color pastel gradients
        'tech-gradient': 'linear-gradient(135deg, #a5f3fc 0%, #c4b5fd 50%, #fbcfe8 100%)',
        'idea-gradient': 'linear-gradient(135deg, #fecdd3 0%, #fcd34d 50%, #fde68a 100%)',
        'know-gradient': 'linear-gradient(135deg, #bbf7d0 0%, #a5f3fc 50%, #ddd6fe 100%)',
      }
    },
  },
  plugins: [],
}

