/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "green-primary": "#0064CF",
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
            keyframes: {
                "zoom-in": {
                    "0%": { transform: "scale(0)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "zoom-out": {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "100%": { transform: "scale(0)", opacity: "0" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                modalShow: {
                    "0%": {
                        opacity: "0",
                        // transform: "scale(0.95) translateY(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        // transform: "scale(1) translateY(0)",
                    },
                },
            },
            animation: {
                "zoom-in": "zoom-in 0.5s ease-out forwards",
                "zoom-out": "zoom-out 0.3s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "modal-show": "modalShow 1s ease-out",
            },
            zIndex: {
                9999: "9999",
                10000: "10000",
                10001: "10001",
            },
        },
    },
    plugins: [],
};
