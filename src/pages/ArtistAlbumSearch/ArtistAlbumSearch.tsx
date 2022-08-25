import { useEffect, useState } from "react";
import { ArtistAlbumCard } from "src/components/Cards";
import styles from "./ArtistAlbumSearch.module.scss";
import SpotifyIconLogo from "src/assets/images/Spotify-Icon-Logo.wine.svg";
import AxiosApi from "src/assets/axios";
import { useParams } from "react-router-dom";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { Typography } from "@mui/material";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useAppDataStoreContext } from "src/context/AppDataStore";

interface ArtistAlbumSearchProps {}

const ArtistAlbumSearch: React.FC<ArtistAlbumSearchProps> = ({}) => {
  const [artistAlbumsData, setArtistAlbumsData] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const { artistID, artistName } = useParams();
  const pageLimit = 10;
  const [albumsTotalLimit, setAlbumsTotalLimit] = useState<number>(100);
  const { setSnack } = useAppDataStoreContext();

  useEffect(() => {
    fetchArtistAlbums();
  }, []);

  useEffect(() => {
    if (offset < albumsTotalLimit && offset !== 1) {
      fetchArtistAlbums();
    } else if (offset > albumsTotalLimit) {
      setSnack({
        message: "No more data to show",
        open: true,
        severity: "error",
      });
    }
  }, [offset]);

  const fetchArtistAlbums = async () => {
    let params = {
      include_groups: "single",
      limit: 10,
      offset: offset,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const response = await AxiosApi({
        method: "GET",
        fetchApiUrl: `${ServerUrls.ARTIST_ALBUM_SEARCH}${artistID}/albums`,
        params: params,
        headers: headers,
      });
      setArtistAlbumsData((preValue: any) => [
        ...preValue,
        ...response.data?.items,
      ]);
      setAlbumsTotalLimit(response.data?.total);
    } catch {
      setSnack({
        message: "Something wen wrong",
        open: true,
        severity: "error",
      });
    }
  };
  return (
    <div className={styles.pageContainer}>
      <Typography variant="h3">{artistName}</Typography>
      <Typography>Albums</Typography>
      <div className="artist-search__cards-container">
        {artistAlbumsData?.map((_item: any, i: number) => (
          <ArtistAlbumCard
            key={i}
            className="artist-search__card"
            artistsArray={_item?.artists}
            releaseDate={_item?.release_date}
            totalTracks={_item?.total_tracks}
            externalUrl={_item?.external_urls?.spotify}
            name={_item?.name}
            image={_item?.images[1]?.url ?? SpotifyIconLogo}
          />
        ))}
        <BottomScrollListener
          onBottom={() => setOffset(offset + pageLimit)}
          debounce={200}
        />
      </div>
    </div>
  );
};

export default ArtistAlbumSearch;
