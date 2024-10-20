"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppInterface } from "@/src/interfaces/AppInterface";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

const AppContext = createContext<AppInterface>({
  userData: "",
});

export function useApp() {
  return useContext(AppContext);
}

function AppProvider({ children }: PropsWithChildren) {
  const { user } = useUser();
  const [userData, setUserData] = useState<string>("");
  useEffect(() => {
    const getUser = async () => {
      if (!user) return;
      try {
        const response = await axios.post("/api/users/");
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [user]);
  return (
    <AppContext.Provider value={{ userData }}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
