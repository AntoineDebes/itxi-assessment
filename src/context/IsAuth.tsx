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
  const [isUserLogedIn, setIsUserLogedIn] = useState<boolean>(false);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
