import { Button, Snackbar } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import AlertMessage from "src/components/AlertMessage/AlertMessage";
import { useAppDataStoreContext } from "src/context/AppDataStore";
import { useIsAuthContext } from "src/context/IsAuth";
import "./MainLayout.scss";

const MainLayout: FC = ({ children }: any) => {
  const { isUserLogedIn, setIsUserLogedIn } = useIsAuthContext();
  const { snack, setSnack } = useAppDataStoreContext();
  const handleSnackClose = () => {
    setSnack({
      open: false,
    });
  };
  return (
    <>
      <div className="layout__header">
        <header>Spotify Artist Search</header>
        {isUserLogedIn && (
          <Button
            sx={{
              color: "black",
            }}
            onClick={() => {
              setIsUserLogedIn(false);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        )}
      </div>
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
