import { createContext, useState } from "react";

export const ScrollSpeedContext = createContext();

export const ScrollSpeedProvider = ({ children }) => {
  const [scrollSpeed, setScrollSpeed] = useState(10); // default speed (duration)

  return (
    <ScrollSpeedContext.Provider value={{ scrollSpeed, setScrollSpeed }}>
      {children}
    </ScrollSpeedContext.Provider>
  );
};
