import React, { createContext, useContext, useState } from 'react';

const commandContext = createContext();

export const CommandProvider = ({ children }) => {
  const [command, setCommand] = useState(null);

  return (
    <commandContext.Provider value={{ command, setCommand }}>
      {children}
    </commandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(commandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};
