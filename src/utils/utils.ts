import {
  handleResponseNavigationModel,
} from "src/types/AppUtilsModels";

export const handleResponseNavigation = ({
  setSnack,
  response,
  navigationLink,
  navigate,
}: handleResponseNavigationModel) => {

  if (!response?.access_token ) {
    setSnack({
      message: `Something went wrong`,
      open: true,
      severity: "error",
    });
    navigate && navigate("/");
  }else {
    navigate && navigate(navigationLink);
  }
};
