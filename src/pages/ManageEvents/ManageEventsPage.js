import React from "react";
import CardEvent from "../../components/cardEvent/CardEvent";
import Box from "@mui/material/Box";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import "./ManageEventsPage.css";

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
      className="manageEventPage"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        margin: "auto",
      }}
    >
      <div className="headerManageEvent">
        <h1>ניהול אירועים</h1>
      </div>
      <div className="eventsList">
        <CacheProvider value={cacheRtl}>
          <Box
            sx={{
              direction: "rtl",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "start",
              justifyContent: "flex-end",
              paddingLeft: "1.5rem",
              width: "auto",
              height: "63vh",
              columnGap: "1.5rem",
              rowGap: "1.5rem",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <CardEvent
                // key={index}
                eventName={eventName}
                eventDatetime={eventDatetime}
                eventPlace={eventPlace}
                eventDescription={eventDescription}
                eventCreator={eventCreator}
              />
            ))}
          </Box>
        </CacheProvider>{" "}
      </div>
    </div>
  );
}
