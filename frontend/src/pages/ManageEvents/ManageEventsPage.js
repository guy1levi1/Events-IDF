import React, { useEffect, useState } from "react";
import CardEvent from "../../components/cardEvent/CardEvent";
import Box from "@mui/material/Box";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import "./ManageEventsPage.css";
import { getEvnets } from "../../utils/api/eventsApi";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/authContext";
import { getFullNameById, getUserById } from "../../utils/api/usersApi";

export default function ManageEventsPage() {
  const auth = useContext(AuthContext);

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

  const [eventsFromDB, setEventsFromDB] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventsFromDB(await getEvnets());
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };

    const initializePage = async () => {
      await fetchData();
    };

    initializePage();
  }, []);

  const handleDeleteEvent = (eventId) => {
    // Update state by filtering out the event with the specified eventId
    setEventsFromDB((prevEvents) =>
      prevEvents.filter((event) => event.eventId !== eventId)
    );
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
            {eventsFromDB.map((event, index) => (
              <CardEvent
                key={event.id} // Use a unique key, in this case, the array index
                eventId={event.id}
                eventName={event.name}
                eventDate={event.date}
                eventLocation={event.place}
                description={event.description}
                eventCreator={event.userId}
                commandsSelector={["צפון"]}
                onDelete={() => handleDeleteEvent(event.id)}
              />
            ))}
          </Box>
        </CacheProvider>
      </div>
    </div>
  );
}
