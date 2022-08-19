import Axios, { AxiosResponse, Method } from "axios";

interface ApiProps {
  method: Method;
  fetchApiUrl: string;
  data?: any;
  params?: any;
  tokenProp?: any;
  setIsLoading?: Function;
}

const AxiosApi = ({
  method,
  fetchApiUrl,
  data,
  params,
  tokenProp,
  setIsLoading,
}: ApiProps) => {
  const token = tokenProp || localStorage.getItem("appToken") || "";

  return new Promise<AxiosResponse>(async (res, rej) => {
    setIsLoading && setIsLoading(true);
    try {
      const ApiData = await Axios({
        method, // Method like GET, POST, DELETE, PUT ...
        url: `${process.env.REACT_APP_API_URL}${fetchApiUrl}`,
        headers: {
          "auth-token": token, // sending the token for the verification
        },
        withCredentials: false,
        data, // data passed
        params,
        timeout: 30000,
      });
      setIsLoading && setIsLoading(false);
      if (ApiData?.data?.hasError) {
        throw new Error(ApiData?.data?.hasError);
      }
      res(ApiData);
    } catch (err) {
      setIsLoading && setIsLoading(false);
      rej(err);
    }
  });
};

export default AxiosApi;
