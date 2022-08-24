import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ArtistCard.scss";

interface ArtistCardProps {
  name: string;
  image: string;
  popularity: number;
  followers: number;
  artistID: number;
  className?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  image,
  popularity,
  followers,
  artistID,
  className,
}) => {
  return (
    <Box
      className={`artist-card__container ${className}`}
      component={Link}
      to={`/artist-album${artistID}/${name}`}
    >
      <LazyLoadImage
        alt="asd"
        effect="blur"
        height={100}
        src={image}
        width={100}
      />
      <div>{name}</div>
      <div>{followers}</div>
      <div>{popularity}</div>
    </Box>
  );
};

export default ArtistCard;
