import { message } from "antd";
import React, { ReactNode, createContext } from "react";

const GlobalContext = createContext<any>(undefined);

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <GlobalContext.Provider value={{ messageApi, contextHolder }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within GlobalContext");
  }
  return context;
};
