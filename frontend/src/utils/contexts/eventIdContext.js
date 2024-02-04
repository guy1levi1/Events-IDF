import React, { createContext, useContext, useState } from "react";

const eventIdContext = createContext();

export const EventIdProvider = ({ children }) => {
  const [eventId, setEventId] = useState(null);

  return (
    <eventIdContext.Provider value={{ eventId, setEventId }}>
      {children}
    </eventIdContext.Provider>
  );
};

export const useEventId = () => {
  const context = useContext(eventIdContext);
  if (!context) {
    throw new Error("useEventId must be used within a EventIdProvider");
  }
  return context;
};
