import { LoadingButton } from "@mui/lab";
import { Link as MaterialLing } from "@mui/material";
import { Link } from "react-router-dom";
import SpotifyIconLogo from "src/assets/images/Spotify-Icon-Logo.wine.svg";
import CustomLoadingButton from "src/components/CustomLoadingButton/CustomLoadingButton";
import "./HomePage.scss";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className="centered__container">
      <div className="homepage__container">
        <CustomLoadingButton
          label="login"
          component={Link}
          to="/login"
          image={SpotifyIconLogo}
          imageAlt="Spotify Logo"
        />
        <CustomLoadingButton
          label="Login with OAuth2"
          component={MaterialLing}
          href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-currently-playing`}
          image={SpotifyIconLogo}
          imageAlt="Spotify Logo"
        />
      </div>
    </div>
  );
};

export default HomePage;
