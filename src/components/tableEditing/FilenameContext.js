import React, { createContext, useContext, useState } from 'react';

const FilenameContext = createContext();

export const FilenameProvider = ({ children }) => {
  const [filename, setFilename] = useState(null);

  return (
    <FilenameContext.Provider value={{ filename, setFilename }}>
      {children}
    </FilenameContext.Provider>
  );
};

export const useFilename = () => {
  const context = useContext(FilenameContext);
  if (!context) {
    throw new Error('useFilename must be used within a FilenameProvider');
  }
  return context;
};
