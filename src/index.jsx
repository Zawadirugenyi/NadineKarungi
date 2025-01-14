import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AppRouter from "./Router";


// Extend the theme to support dark and light mode
const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Default color mode
    useSystemColorMode: false, // Do not use system color mode
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
