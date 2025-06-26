"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [active, setActive] = useState("All");
  return (
    <UserContext.Provider value={{ active, setActive }}>
      {children}
    </UserContext.Provider>
  );
}
function useData() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context cannot be used in this component");
  }
  return context;
}
export { useData, UserProvider };
