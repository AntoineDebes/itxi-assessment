import { Snackbar } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import AlertMessage from "src/components/AlertMessage/AlertMessage";
import { useAppDataStoreContext } from "src/context/AppDataStore";
import "./MainLayout.scss";

const MainLayout: FC = ({ children }: any) => {
  const { snack, setSnack } = useAppDataStoreContext();
  const handleSnackClose = () => {
    setSnack({
      open: false,
    });
  };
  return (
    <>
      <header className="layout__header">Spotify Artist Search</header>
      <main className="layout__main">
        {children} <Outlet />
        <Snackbar
          open={snack?.open}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <AlertMessage
            onClose={handleSnackClose}
            severity={snack?.severity}
            sx={{ width: "100%" }}
          >
            {snack?.message}
          </AlertMessage>
        </Snackbar>
      </main>
    </>
  );
};

export default MainLayout;
