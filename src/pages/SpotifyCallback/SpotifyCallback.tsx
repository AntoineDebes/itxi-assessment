import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useIsAuthContext } from "src/context/IsAuth";

interface SpotifyCallbackProps {}

const SpotifyCallback: React.FC<SpotifyCallbackProps> = ({}) => {
  const { setIsUserLogedIn } = useIsAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);
    if (!!parsedHash) {
      const token = `${parsedHash.token_type} ${parsedHash.access_token}`;
      localStorage.setItem("accessToken", token);
      setIsUserLogedIn(true);
      navigate("/artist-search");
    } else {
      setIsUserLogedIn(false);
      navigate("/");
    }
  }, []);
  return <></>;
};

export default SpotifyCallback;
