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

interface ArtistSearchProps {}

export const ArtistSearch: React.FC<ArtistSearchProps> = ({}) => {
  const { handleSubmit } = useFormContext<FetchArtistsModel>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [artistsResponseData, setArtistsResponseData] = useState<any>({});

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSubmit(handleOnchangeFetchArtists)(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleOnchangeFetchArtists: SubmitHandler<FetchArtistsModel> = async (
    data
  ) => {
    setArtistsResponseData({});
    let params = {
      q: data.searchName,
      type: "artist",
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
        fetchApiUrl: `${ServerUrls.SEARCH}search`,
        params: params,
        headers: headers,
      });
      console.log(response);
      setArtistsResponseData(response.data.artists);
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
        <CustomIconTextField
          label="Search for an artist..."
          reigsterName="searchName"
          endAdornmentProp={<SearchIcon />}
        />
      </Box>
      {artistsResponseData?.items?.map((_item: any, i: number) => (
        <ArtistCard
          key={i}
          className="artist-search__card"
          name={_item.name}
          image={_item.images[1]?.url ?? SpotifyIconLogo}
          popularity={_item.popularity}
          followers={_item.followers.total}
          artistId={_item.id}
        />
      ))}
    </div>
  );
};

export default ArtistSearch;
