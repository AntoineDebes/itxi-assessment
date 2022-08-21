import { useFormContext, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/material";
import AxiosApi from "src/assets/axios";
import qs from "qs";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "src/components/Forms";
import "./Login.scss";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<any>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<any> = async (data) => {
    setIsButtonLoading(true);
    const client_id = "88b145456e4d4f2cb08ca25090595136"; // Your client id
    const client_secret = "282eeb1869ed46d1882af549abcecda5"; // Your secret

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const auth = {
      username: data.id,
      password: data.secret,
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
      if (response.status === 200) {
        navigate("/artist-search");
      }
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="centered__container">
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        className="login__form"
        sx={{
          border: "1px solid black",
          borderRadius: 4,
          padding: "2em",
        }}
      >
        <CustomTextField reigsterName="id" label="User ID" required />
        <CustomTextField reigsterName="secret" label="User Secret" required />
        <LoadingButton type="submit" loading={isButtonLoading}>
          login
        </LoadingButton>
      </Box>
    </div>
  );
};

export default Login;
