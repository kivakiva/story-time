import React, { useState } from "react";

const MyReadsContext = React.createContext({
  currentTab: undefined,
  setCurrentTab: () => {},
  listening: () => {},
  reading: () => {},
});

export const MyReadsProvider = (props) => {
  const [currentTab, setCurrentTab] = useState("listening");
  const listening = () => {
    setCurrentTab("listening");
  };
  const reading = () => {
    setCurrentTab("reading");
  };
  return (
    <MyReadsContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        listening,
        reading,
      }}
    >
      {props.children}
    </MyReadsContext.Provider>
  );
};

export default MyReadsContext;
