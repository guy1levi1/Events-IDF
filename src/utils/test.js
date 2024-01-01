import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react'
import { Box, ThemeProvider, Typography, createTheme } from '@mui/material'
import rtlPlugin from "stylis-plugin-rtl";
import React from 'react'


const theme = createTheme({
    direction: "rtl",
  });
  
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });


export default function Test() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box bgcolor="#D9D9D9">
            <Typography variant='h6' component="h1">פריסת שחרור לאור</Typography>
            <Typography variant='h6' component="h1">פריסת שחרור לאור</Typography>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  
  )
}
