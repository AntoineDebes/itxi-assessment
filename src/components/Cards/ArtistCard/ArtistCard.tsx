import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ArtistCard.scss";
import { Rating, Typography } from "@mui/material";
import { useEffect } from "react";

interface ArtistCardProps {
  name: string;
  image: string;
  popularity: number;
  followers: number;
  artistID: number;
  className: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  image,
  popularity,
  followers,
  artistID,
  className,
}) => {
  const transformedPopularityIntoDividedByFive =
    popularity && (popularity * 5) / 100;

  return (
    <Box
      className={`card__container ${className}`}
      component={Link}
      to={`/artist-album${artistID}/${name}`}
    >
      <div className="card__img-container">
        <LazyLoadImage alt="asd" effect="blur" src={image} width="100%" />
      </div>
      <div className="card__content-container">
        <div className="card__content-container__holder">
          <p className="card__artist-name">{name}</p>
          <Typography>{followers?.toLocaleString()} followers</Typography>
        </div>
        <Rating
          name="read-only"
          value={transformedPopularityIntoDividedByFive}
          precision={0.5}
          readOnly
        />
      </div>
    </Box>
  );
};

export default ArtistCard;
