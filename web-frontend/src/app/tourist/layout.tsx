"use client";

import * as React from "react";

const defaultContext = {
  location: "default location",
};

const TouristLayout = ({ children }: { children: React.ReactNode }) => {
  const touristContext = React.createContext({
    location: "testing location",
  });

  return (
    <touristContext.Provider value={defaultContext}>
      {children}
    </touristContext.Provider>
  );
};

export default TouristLayout;
