import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function InputsWrapper(props) {
  return (
    <div
      dir="rtl"
      style={{ width: "inherit", height: "92%" }}
      className={props.className}
    >
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          {props.children}
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}