import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, FormControl, TextField } from "@mui/material";
import AxiosApi from "src/assets/axios";
import axios from "axios";
import qs from "qs";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<any> = async () => {
    const client_id = "88b145456e4d4f2cb08ca25090595136"; // Your client id
    const client_secret = "282eeb1869ed46d1882af549abcecda5"; // Your secret

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const auth = {
      username: client_id,
      password: client_secret,
    };

    // const headers = {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   auth: {
    //     username: client_id,
    //     password: client_secret,
    //   },
    // };
    const data = {
      grant_type: "client_credentials",
    };

    try {
      // const response = await axios.post(
      //   "https://accounts.spotify.com/api/token",
      //   qs.stringify(data),
      //   headers
      // );
      const response = await AxiosApi({
        method: "POST",
        fetchApiUrl: `${ServerUrls.ACCOUNTS_AUTH}token`,
        data: qs.stringify(data),
        auth,
        headers,
      });
      console.log(response);
      // return response.data.access_token;
      const tokenConcact = `${response.data.token_type} ${response.data.access_token}`;
      console.log("tokenConcact", tokenConcact);
      localStorage.setItem("accessToken", tokenConcact);
      // navigate("/artist-search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(handleLogin)}>
        <TextField {...register("username")} />
        <TextField {...register("password")} />
        <Button type="submit">login</Button>
      </Box>
    </Box>
  );
};

export default Login;
