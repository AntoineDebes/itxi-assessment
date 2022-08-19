import { useState, useContext, createContext } from "react";
interface IsAuthContextProps {
  isUserLogedIn: number;
  setIsUserLogedIn: Function;
}

const IsAuthContext = createContext<IsAuthContextProps>({
  isUserLogedIn: 0,
  setIsUserLogedIn: () => {},
});

export function useIsAuthContext() {
  return useContext(IsAuthContext);
}

export function IsAuthContextProvider({ children }: any) {
  let userAccess: number = Number(localStorage.getItem("UserAccess"));
  const [isUserLogedIn, setIsUserLogedIn] = useState<number>(userAccess);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
