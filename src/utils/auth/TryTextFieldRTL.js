import { Box, CssBaseline, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl/";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function IndexPage() {
  return (
    <div dir="rtl">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box m={2}>
            <TextField label={"שם משתמש"} variant="outlined" ז />
            <br />
            <br />
            Current Direction: {"rtl"}
            <br />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
