import React, { useCallback, useEffect, useState } from "react";
import CardEvent from "../../components/cardEvent/CardEvent";
import Box from "@mui/material/Box";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import "./ManageEventsPage.css";
import {
  deleteEvent,
  getEventsByCommandId,
  getEvnets,
} from "../../utils/api/eventsApi";
import Swal from "sweetalert2";
import {
  getCommandIdByUserId,
  getCommandNameByUserId,
} from "../../utils/api/usersApi";
import {
  getCommandIdByName,
  getCommandNameById,
} from "../../utils/api/commandsApi";
import { deleteAllEventCommandsByEventId } from "../../utils/api/eventCommandsApi";

export default function ManageEventsPage() {
  const [eventsFromDB, setEventsFromDB] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loggedUserId = userData ? userData.userId : "";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
  }, []);
  // Function to fetch events from the API
  const getEventsFromAPI = useCallback(async () => {
    try {
      const commandId = await getCommandIdByUserId(loggedUserId);
      let events = [];

      if (commandId === (await getCommandIdByName("סגל"))) {
        setIsAdmin(true);
        events = await getEvnets(commandId);
      } else {
        setIsAdmin(false);

        // Use the updated value of userCommandId directly
        events = await getEventsByCommandId(commandId);
      }
      events.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEventsFromDB(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [getEvnets, getEventsByCommandId, setEventsFromDB, getCommandIdByUserId]);

  useEffect(() => {
    getEventsFromAPI();
  }, [getEventsFromAPI, loggedUserId]);

  const handleDeleteEvent = async (eventId) => {
    // Update state by filtering out the event with the specified eventId
    try {
      await deleteAllEventCommandsByEventId(eventId).then(() => {
        console.log("successed deleting event commands");
      });
      await deleteEvent(eventId).then(() => {
        console.log("successed deleting event");
      });

      const events = await getEvnets();
      events.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEventsFromDB(events);

      Swal.fire({
        title: "נמחק בהצלחה!",
        text: "האירוע {שם האירוע} נמחק בהצלחה.",
        icon: "success",
        confirmButtonText: "אישור",
      }).then((result) => {});
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "לא ניתן למחוק אירוע",
        text: error.massage,
        icon: "error",
        confirmButtonText: "נסה שנית",
      }).then((result) => {});
    }
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
                isAdmin={isAdmin}
                onDelete={() => handleDeleteEvent(event.id)}
              />
            ))}
          </Box>
        </CacheProvider>
      </div>
    </div>
  );
}
