export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#792CA2",
          dark: "#67238A"
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-in': 'slideIn 0.35s ease-out forwards',
        'float-slow': 'floatSlow 18s ease-in-out infinite alternate',
        'float-medium': 'floatMedium 12s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        floatSlow: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -45px) scale(1.1)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        floatMedium: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-40px, 40px) scale(1.15)' },
          '100%': { transform: 'translate(20px, -20px) scale(0.9)' },
        }
      }
    }
  },
  plugins: []
};