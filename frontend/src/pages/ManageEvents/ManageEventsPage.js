import React, { useState } from "react";
import CardEvent from "../../components/cardEvent/CardEvent";
import Box from "@mui/material/Box";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import "./ManageEventsPage.css";

export default function ManageEventsPage() {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const eventId = "1";
  const eventName = "פריסת שחרור לאור";
  const eventDate = new Date()
    .toLocaleString("he-IL", options)
    .replace(/\//g, ".");
  const eventLocation = 'תל השומר מקל"ר';
  const description = `נערוך לאורצ'וק פריסת שחרור, באירוע נחגוג את היציאה לאזרחות של
  אור(אפילו שהוא תוך שנייה חוזר למילואים), מוזמנים! 😀`;
  const eventCreator = "גיא לוי";

  const commandsSelector = ["סגל", "פקער", "מרכז", "תקשוב", "מרכז", "צפון"];

  // will get from db
  const [events, setEvents] = useState([
    {
      eventId: "1",
      eventName: "תימחק",
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "2",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "3",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "4",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "5",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "6",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "7",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
    {
      eventId: "8",
      eventName,
      eventDate,
      eventLocation,
      description,
      eventCreator,
      commandsSelector,
    },
  ]);

  const handleDeleteEvent = (eventId) => {
    // Update state by filtering out the event with the specified eventId
    setEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== eventId));
  };

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
            id="eventsListBox"
            sx={{
              direction: "rtl",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "start",
              justifyContent: "center",
              paddingLeft: "1.5rem",
              height: "63vh",
              columnGap: "1.5rem",
              rowGap: "1.5rem",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {events.map((event, index) => (
              <CardEvent
                key={index} // Use a unique key, in this case, the array index
                eventId={event.eventId}
                eventName={event.eventName}
                eventDate={event.eventDate}
                eventLocation={event.eventLocation}
                description={event.description}
                eventCreator={event.eventCreator}
                commandsSelector={event.commandsSelector}
                onDelete={() => handleDeleteEvent(event.eventId)}
              />
            ))}
          </Box>
        </CacheProvider>
      </div>
    </div>
  );
}