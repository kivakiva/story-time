module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      chat: {
        100: "#B4E4D8",
        200: "#D8B4E4",
      },
      main: {
        100: '#796D5D'
      }
    },
    extend: {
      // spacing: {
      //   '28':
      // }
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
