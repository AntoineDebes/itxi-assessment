import { useState, useContext, createContext } from "react";
interface IsAuthContextProps {
  isUserLogedIn: boolean;
  setIsUserLogedIn: Function;
}

const IsAuthContext = createContext<IsAuthContextProps>({
  isUserLogedIn: false,
  setIsUserLogedIn: () => {},
});

export function useIsAuthContext() {
  return useContext(IsAuthContext);
}

export function IsAuthContextProvider({ children }: any) {
  let isUserLoged: boolean = !!localStorage.getItem("isUserLoged");
  const [isUserLogedIn, setIsUserLogedIn] = useState<boolean>(isUserLoged);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
