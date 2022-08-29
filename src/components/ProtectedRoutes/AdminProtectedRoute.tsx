import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthContext } from "src/context/IsAuth";

const IsUserLogedInProtectedRoute: FC = () => {
  const { isUserLogedIn } = useIsAuthContext();
  let isAuthorized = (() => {
    if (isUserLogedIn) {
      return true;
    } else {
      return false;
    }
  })();

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default IsUserLogedInProtectedRoute;
