import { useEffect, useState } from "react";
import { ArtistCard } from "src/components/Cards";
import styles from "./ArtistAlbumSearch.module.scss";
import SpotifyIconLogo from "src/assets/images/Spotify-Icon-Logo.wine.svg";
import AxiosApi from "src/assets/axios";
import { useParams } from "react-router-dom";
import { ServerUrls } from "src/assets/enums/serverUrls";

interface ArtistAlbumSearchProps {}

const ArtistAlbumSearch: React.FC<ArtistAlbumSearchProps> = ({}) => {
  const [artistAlbumsData, setArtistAlbumsData] = useState<any>();
  const { artistID, artistName } = useParams();
  // const artistID = "7eLcDZDYHXZCebtQmVFL25";
  // const artistName = "asda";

  useEffect(() => {
    console.log("artistID", artistID);

    fetchArtistAlbums();
  }, []);

  const fetchArtistAlbums = async () => {
    let params = {
      include_groups: "single",
      market: "es",
      limit: 10,
      offset: 1,
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
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <h1>{artistName}</h1>
      <div className="artist-search__cards-container">
        {artistAlbumsData?.items?.map((_item: any, i: number) => (
          <ArtistCard
            key={i}
            className="artist-search__card"
            name={_item?.name}
            image={_item?.images[1]?.url ?? SpotifyIconLogo}
            popularity={_item?.popularity}
            followers={_item?.followers?.total}
            artistID={_item?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbumSearch;
