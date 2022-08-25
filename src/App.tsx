import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { FC, useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { AppDataStoreContextProvider } from "./context/AppDataStore";

const App: FC = () => {
  const theme: any = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Roboto",
        },
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: "black",
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                position: "absolute",
                bottom: "-22px",
                left: "0",
                color: "red",
              },
            },
          },
        },
      }),
    []
  );
  return (
    <main className="wrapper">
      <AppDataStoreContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </Router>
      </AppDataStoreContextProvider>
    </main>
  );
};

export default App;
