import { Box } from "@mui/system";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ArtistAlbumCard.scss";
import { Button, Link, Rating, Typography } from "@mui/material";
import { useEffect } from "react";

interface ArtistAlbumCardProps {
  name: string;
  image: string;
  className: string;
  artistsArray: any[];
  releaseDate: string;
  totalTracks: number;
  externalUrl: string;
}

const ArtistAlbumCard: React.FC<ArtistAlbumCardProps> = ({
  name,
  image,
  className,
  artistsArray,
  releaseDate,
  totalTracks,
  externalUrl,
}) => {
  const artistsAlbumList = artistsArray
    ?.map((_item: any) => _item.name)
    .join(", ");

  return (
    <Box className={`card__container ${className}`}>
      <div className="card__img-container">
        <LazyLoadImage alt="asd" effect="blur" src={image} width="100%" />
      </div>
      <div className="card__content-container" style={{ height: "14em" }}>
        <div className="card__content-container__holder">
          <p className="card__artist-name">{name}</p>
          <Typography>{artistsAlbumList}</Typography>
        </div>
        <div>
          <p>{releaseDate}</p>
          <p>{totalTracks} tracks</p>
        </div>
        <div className="">
          <Button component={Link} href={externalUrl} target="_blank" fullWidth>
            Preview on Spotify
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ArtistAlbumCard;
