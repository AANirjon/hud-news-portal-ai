// PreferencesContext.js
import { createContext, useState, useContext } from "react";

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [version, setVersion] = useState(0);

  const updatePreferences = (newTopics, newTags) => {
    setTopics(newTopics);
    setTags(newTags);
    setVersion((v) => v + 1); // trigger reload
  };

  return (
    <PreferencesContext.Provider
      value={{ topics, tags, version, updatePreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
