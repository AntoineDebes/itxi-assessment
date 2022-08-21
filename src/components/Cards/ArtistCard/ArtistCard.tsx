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
  className?: string;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  image,
  popularity,
  followers,
  artistId,
  className,
}) => {
  return (
    <Box className={`artist-card__container ${className}`}>
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
