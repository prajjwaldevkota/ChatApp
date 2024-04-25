import { createTheme } from "@mui/material/styles";
export default createTheme({
    typography: {
        useNextVariants: true,
    },
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "rgba(25, 174, 204, 1)",
            "main": "rgba(30, 107, 34, 0.97)",
            "dark": "rgba(12, 32, 165, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(105, 105, 82, 1)",
            "main": "rgba(91, 20, 100, 1)",
            "dark": "#c51162",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e57373",
            "main": "rgba(224, 25, 11, 1)",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(92, 20, 20, 0.87)",
            "secondary": "rgba(39, 75, 105, 0.54)",
            "disabled": "rgba(11, 112, 15, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
});
