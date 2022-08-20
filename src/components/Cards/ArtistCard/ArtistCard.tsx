import { Box } from "@mui/system";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ArtistCard.scss";

interface ArtistCardProps {
  name: string;
  image: string;
  popularity: number;
  followers: number;
  artistId: number;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  image,
  popularity,
  followers,
  artistId,
}) => {
  useEffect(() => {
    console.log("image", image);
  }, [image]);
  return (
    <Box className="artist-card__container">
      {/* <img src={image} /> */}
      <LazyLoadImage
        alt="asd"
        effect="blur"
        height={100}
        src={image} // use normal <img> attributes as props
        width={100}
      />
    </Box>
  );
};

export default ArtistCard;
