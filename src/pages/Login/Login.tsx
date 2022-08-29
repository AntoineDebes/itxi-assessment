import { useState } from "react";
import { useFormContext, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/material";
import AxiosApi from "src/assets/axios";
import qs from "qs";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "src/components/Forms";
import "./Login.scss";
import { LoadingButton } from "@mui/lab";
import { LoginModel } from "src/types/LoginModel";
import { useAppDataStoreContext } from "src/context/AppDataStore";
import { useIsAuthContext } from "src/context/IsAuth";
import { handleResponseNavigation } from "src/utils/utils";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { setIsUserLogedIn } = useIsAuthContext();
  const [isButtonLoading, setIsButtonLoading] = useState<{
    login: boolean;
    loginAsAdmin: boolean;
  }>({
    login: false,
    loginAsAdmin: false,
  });
  const { setSnack } = useAppDataStoreContext();
  const client_id = process.env.REACT_APP_CLIENT_ID!;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET!;
  const { handleSubmit } = useFormContext<LoginModel>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginModel> = async ({
    id,
    secret,
    shouldLoginBtnLoad = true,
  }) => {
    shouldLoginBtnLoad &&
      setIsButtonLoading((preValue: any) => ({ ...preValue, login: true }));

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const auth = {
      username: id,
      password: secret,
    };

    const dataParam = {
      grant_type: "client_credentials",
    };
    try {
      const response = await AxiosApi({
        method: "POST",
        fetchApiUrl: `${ServerUrls.ACCOUNTS_AUTH}token`,
        data: qs.stringify(dataParam),
        auth,
        headers,
      });
      const tokenConcact = `${response.data.token_type} ${response.data.access_token}`;
      localStorage.setItem("accessToken", tokenConcact);
      setIsButtonLoading({
        loginAsAdmin: false,
        login: false,
      });
      // handleResponseNavigation({
      //   response: response,
      //   navigate: navigate,
      //   navigationLink: "/artist-search",
      //   setSnack: setSnack,
      // });
      if (response.status === 200) {
        setIsUserLogedIn(true);
        setSnack({
          message: "Welcome",
          open: true,
          severity: "success",
        });
        navigate("/artist-search");
      }
    } catch (error) {
      setIsButtonLoading({
        loginAsAdmin: false,
        login: false,
      });
    }
  };
  return (
    <div className="centered__container">
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        className="login__form"
        sx={{
          boxShadow: "0px 0px 8px black",
          borderRadius: 4,
          padding: "2em",
        }}
      >
        <CustomTextField reigsterName="id" label="User ID" required />
        <CustomTextField
          reigsterName="secret"
          label="User Secret"
          required
          type="password"
        />
        <div className="login__form__btn-container">
          <LoadingButton type="submit" loading={isButtonLoading.login}>
            login
          </LoadingButton>
          <LoadingButton
            onClick={() => {
              setIsButtonLoading((preValue: any) => ({
                ...preValue,
                loginAsAdmin: true,
              }));
              handleLogin({
                id: client_id,
                secret: client_secret,
                shouldLoginBtnLoad: false,
              });
            }}
            loading={isButtonLoading.loginAsAdmin}
          >
            login as a guest
          </LoadingButton>
        </div>
      </Box>
    </div>
  );
};

export default Login;
