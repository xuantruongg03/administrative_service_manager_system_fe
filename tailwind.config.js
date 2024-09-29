/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "green-primary": "#0E9F6E",
                "medhealth-blue": "#53a7d8",
                "medhealth-button-blue": "#BBE6FF",
                "medhealth-button-blue-200": "#015C92",
                "medhealth-dialog-blue": "#F2FAFF", //E6EDF2
                "medhealth-dialog-blue-200": "#E6EDF2",
                "medhealth-blue-search": "#2D82B5",
                "medhealth-gray-200": "#E4E6E9",
                "medhealth-gray-300": "#7A7C80",
                "medhealth-gray-250": "#d7d9dd",
                "medhealth-blue-350": "#BCE6FF",
                "medhealth-orange": "#FFEFDA",
            },
            height: {
                "72v": "72vh",
                100: "380px",
            },
            width: {
                30: "120px",
                100: "500px",
                vh: "200vh",
                90: "91vw",
            },
            spacing: {
                128: "32rem",
            },
            boxShadow: {
                custom: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px inset;",
            },
        },
    },
    plugins: [],
};
