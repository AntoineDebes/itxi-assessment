import Axios, { AxiosResponse, Method } from "axios";

interface ApiProps {
  method: Method;
  fetchApiUrl: string;
  data?: any;
  params?: any;
  headers?: any;
  auth?: any;
}

const AxiosApi = ({
  method,
  fetchApiUrl,
  data,
  params,
  headers,
  auth,
}: ApiProps) => {
  const token = localStorage.getItem("accessToken") || "";

  return new Promise<AxiosResponse>(async (res, rej) => {
    try {
      const ApiData = await Axios({
        method, // Method like GET, POST, DELETE, PUT ...
        url: fetchApiUrl,
        headers: {
          Authorization: token,
          ...headers,
        },
        auth: auth,
        params: params,
        data,
        timeout: 30000,
      });
      res(ApiData);
    } catch (err) {
      rej(err);
    }
  });
};

export default AxiosApi;
