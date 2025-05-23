import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { QueryStatus, useQuery } from "react-query";
import * as apiClient from "../api-client";


type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR" | "LOADING";
};

export type ServerMessageType = {
  message: string,
}

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void,
  isLoggedIn: QueryStatus,
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

//j shob components k AppContextProvider diye wrap korbo will have access to showToast.
export const AppContextProvider = ({ children }: {children: React.ReactNode}) => {

  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { status } = useQuery<ServerMessageType, Error>("validateToken", apiClient.validateToken, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <AppContext.Provider value={{
      showToast: (toastMessage) => {setToast(toastMessage)},
      isLoggedIn: status,
    }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  )
  
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
