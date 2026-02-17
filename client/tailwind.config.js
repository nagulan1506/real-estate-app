/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: {
          'primary-gradient': 'linear-gradient(135deg, #141E30 0%, #243B55 100%)', // Midnight Blue (Dark)
          'secondary-gradient': 'linear-gradient(135deg, #E0AAFF 0%, #9D4EDD 100%)', // Bright Amethyst (Visible on Dark)
          'accent-gradient': 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', // Deep Emerald/Ocean
        }
      }
    },
  },
  plugins: [],
}
