module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans JP", "cursive"],
        Poppins: ["Poppins", "cursive"],
        Inter: ["Inter", "cursive"],
       },
      spacing: {
        "15%":"15%",
        "10%":"10%",
        "8%": "8%",
        "5%": "5%",
      },
      colors: {
        primary: "#28CDB1",
        secondary: "#285A7B",
        third: "#EEF4F8",
        fourth: "#E6E1F8",
        priceColor: "#8270DE",
        priceBg: "#EAE7FF",
        gridTitle: "#595959",
        edit: "#ff9f43",
        sold: "#1dd1a1",
        delete: "#ff6b6b",
        hr: "#DDDDDD",
        blackLight: '#212121',
        gradientFrom: '#E9F1F7',
        gradientTo: '#FAFCFD',
        fifth:"#384161",
        hover: "#24b99f",
      },
      zIndex: {
        "min-1": "-1",
      },
      screens: {
        xs: "450px",
        cmd: { max: "768px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
