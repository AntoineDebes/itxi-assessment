import { useState, useContext, createContext } from "react";
import { SnackBarToasterModel } from "src/types/snackbarModel";

interface IsAuthContextProps {
  artistData: any;
  setArtistData: Function;
  artistSearchOffset: any;
  setArtistSearchOffset: any;
  snack: SnackBarToasterModel;
  setSnack: Function;
}

const AppDataStoreContext = createContext<IsAuthContextProps>({
  artistData: [],
  setArtistData: () => {},
  artistSearchOffset: 1,
  setArtistSearchOffset: () => {},
  snack: {
    message: "",
    color: "",
    severity: "success",
    open: false,
  },
  setSnack: () => {},
});

export function useAppDataStoreContext() {
  return useContext(AppDataStoreContext);
}

export function AppDataStoreContextProvider({ children }: any) {
  const [artistData, setArtistData] = useState<any>([]);
  const [artistSearchOffset, setArtistSearchOffset] = useState<number>(1);
  const [snack, setSnack] = useState<any>({
    message: "",
    color: "",
    severity: "success",
    open: false,
  });

  return (
    <>
      <AppDataStoreContext.Provider
        value={{
          artistData,
          setArtistData,
          artistSearchOffset,
          setArtistSearchOffset,
          snack,
          setSnack,
        }}
      >
        {children}
      </AppDataStoreContext.Provider>
    </>
  );
}
