import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import SpotifyIconLogo from "src/assets/images/Spotify-Icon-Logo.wine.svg";
import "./HomePage.scss";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className="centered__container">
      <div className="homepage__container">
        <LoadingButton
          variant="outlined"
          sx={{
            minHeight: "3.5em",
          }}
          component={Link}
          to="/login"
          fullWidth
          endIcon={
            <img
              className="homepage__container__img"
              src={SpotifyIconLogo}
              alt="Spotify Logo"
              width={80}
            />
          }
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
};

export default HomePage;
