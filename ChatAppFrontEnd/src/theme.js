import { createTheme } from "@mui/material/styles";
export default createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        "common": {
            "black": "#000",
            "white": "rgba(162, 124, 124, 1)"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "rgba(34, 159, 201, 1)",
            "main": "rgba(42, 119, 76, 1)",
            "dark": "rgba(91, 95, 22, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(58, 17, 31, 1)",
            "main": "rgba(116, 38, 66, 1)",
            "dark": "rgba(53, 16, 33, 0.6)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e57373",
            "main": "#f44336",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(5, 4, 1, 0.87)",
            "secondary": "rgba(37, 18, 18, 0.54)",
            "disabled": "rgba(66, 150, 13, 0.38)",
            "hint": "rgba(9, 44, 8, 0.38)"
        }
    }
});