import React from "react";
import CardEvent from "../../components/cardEvent/CardEvent";
import "./ManageEventsPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

export default function ManageEventsPage({ componentCount }) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const eventName = "פריסת שחרור לאור";
  const eventDatetime = new Date()
    .toLocaleString("he-IL", options)
    .replace(/\//g, ".");
  const eventPlace = 'תל השומר מקל"ר';
  const eventDescription = `נערוך לאורצ'וק פריסת שחרור, באירוע נחגוג את היציאה לאזרחות של
  אור(אפילו שהוא תוך שנייה חוזר למילואים), מוזמנים! 😀`;
  const eventCreator = "גיא לוי";

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "white" }}>ניהול אירועים</h1>
      <CacheProvider value={cacheRtl}>
        <Box
          sx={{
            flexGrow: 1,
            width: "93rem",
            height: "31rem",
            overflowX: "hidden",
            overflowY: "scroll",
            direction: "rtl",
          }}
        >
          <Grid
            sx={{
              "& .MuiGrid2-root": {
                width: "30rem",
              },
              direction: "ltr",
            }}
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <Grid
                xs={2}
                sm={4}
                md={6}
                key={index}
                style={{ marginRight: "1rem" }}
              >
                <CardEvent
                  eventName={eventName}
                  eventDatetime={eventDatetime}
                  eventPlace={eventPlace}
                  eventDescription={eventDescription}
                  eventCreator={eventCreator}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CacheProvider>
    </div>
  );
}
