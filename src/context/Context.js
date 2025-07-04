"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [active, setActive] = useState("All");
  const [text, setText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const refetchProfile = async () => {
    const res = await axios.get("/api/users/me", { withCredentials: true });
    const data = res.data;
    setProfileData(data);
  };
  return (
    <UserContext.Provider
      value={{
        active,
        setActive,
        text,
        setText,
        isLoggedIn,
        setIsLoggedIn,
        profileData,
        setProfileData,
        refetchProfile,
      }}
    >
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
