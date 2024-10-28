"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { AppInterface } from "../types/definition";
import { User } from "@prisma/client";
import { uuidv4 } from "../lib/utils";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";

const AppContext = createContext<AppInterface>({
  userData: undefined,
  isLoggedIn: false,
  startLoader: () => "",
  markLoadingComplete: () => {},
  isLoading: false,
});

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

function AppProvider({ children }: PropsWithChildren) {
  const { user, isLoading: authLoading } = useUser();
  const [loadingProcesses, setLoadingProcesses] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const startLoader = () => {
    const loaderId = uuidv4();
    setLoadingProcesses((prev) => [...prev, loaderId]);
    return loaderId;
  };

  const markLoadingComplete = (loaderId: string) => {
    setLoadingProcesses((prev) => prev.filter((id) => id !== loaderId));
  };

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["userData", user?.sub],
    queryFn: async () => {
      try {
        const response = await axios.post("/api/users/");
        if (response.data.user) {
          setIsLoggedIn(true);
          return response.data.user! as User;
        }
        setIsLoggedIn(false);
        return undefined;
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        return undefined;
      }
    },
    enabled: !!user?.sub,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading =
    authLoading || userDataLoading || loadingProcesses.length > 0;

  return (
    <AppContext.Provider
      value={{
        userData,
        isLoggedIn,
        startLoader,
        markLoadingComplete,
        isLoading,
      }}
    >
      {children}
      <Toaster position="bottom-center" />
      {isLoading && <Loader />}
    </AppContext.Provider>
  );
}

export default AppProvider;
