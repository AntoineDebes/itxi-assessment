import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext, SubmitHandler } from "react-hook-form";
import AxiosApi from "src/assets/axios";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { ArtistCard } from "src/components/Cards";
import { useDebounce } from "src/hooks/useDebounce";
import SpotifyIconLogo from "src/assets/images/Spotify-Icon-Logo.wine.svg";
import "./ArtistSearch.scss";
import { CustomIconTextField } from "src/components/Forms";
import SearchIcon from "@mui/icons-material/Search";
import { FetchArtistsModel } from "src/types/FetchArtistsModel";
import { useAppDataStoreContext } from "src/context/AppDataStore";
import { BottomScrollListener } from "react-bottom-scroll-listener";

interface ArtistSearchProps {}

const ArtistSearch: React.FC<ArtistSearchProps> = ({}) => {
  const { handleSubmit } = useFormContext<FetchArtistsModel>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const pageLimit = 10;
  const {
    artistData,
    setArtistData,
    artistSearchOffset,
    setArtistSearchOffset,
  } = useAppDataStoreContext();

  useEffect(() => {
    if (artistSearchOffset !== 0) {
      handleSubmit(handleOnchangeFetchArtists)(debouncedSearchTerm);
    }
  }, [artistSearchOffset]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setArtistData([]);
      setArtistSearchOffset(0);
      handleSubmit(handleOnchangeFetchArtists)(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleOnchangeFetchArtists: SubmitHandler<FetchArtistsModel> = async (
    data
  ) => {
    let params = {
      q: data.searchName,
      type: "artist",
      limit: 10,
      offset: artistSearchOffset,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await AxiosApi({
        method: "GET",
        fetchApiUrl: `${ServerUrls.ARTIST_SEARCH}search`,
        params: params,
        headers: headers,
      });
      setArtistData((preValue: any) => [
        ...preValue,
        ...response.data.artists.items,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="artist-search">
      <Box
        component="form"
        className="artist-search__form"
        onChange={(event: any) => {
          setSearchTerm(event);
        }}
      >
        <div className="artist-search__form__search-container">
          <CustomIconTextField
            label="Search for an artist..."
            reigsterName="searchName"
            endAdornmentProp={<SearchIcon />}
            fullWidth
          />
        </div>
      </Box>
      <div className="artist-search__cards-container">
        {artistData?.map((_item: any, i: number) => (
          <ArtistCard
            key={i}
            className="artist-search__card"
            name={_item.name}
            image={_item.images[1]?.url ?? SpotifyIconLogo}
            popularity={_item.popularity}
            followers={_item.followers.total}
            artistID={_item.id}
          />
        ))}
        <BottomScrollListener
          onBottom={() => setArtistSearchOffset(artistSearchOffset + pageLimit)}
          debounce={300}
        />
      </div>
    </div>
  );
};

export default ArtistSearch;
