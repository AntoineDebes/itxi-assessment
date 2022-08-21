import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AxiosApi from "src/assets/axios";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { ArtistCard } from "src/components/Cards";
import "./ArtistSearch.scss";

interface ArtistSearchProps {}

export const ArtistSearch: React.FC<ArtistSearchProps> = ({}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const [artistsResponseData, setArtistsResponseData] = useState<any>({});

  const handleOnchangeFetchArtists: SubmitHandler<any> = async (data) => {
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
        onChange={handleSubmit(handleOnchangeFetchArtists)}
      >
        <TextField {...register("searchName", { required: true })} />
      </Box>
      {artistsResponseData?.items?.map((_item: any, i: number) => (
        <ArtistCard
          key={i}
          className="artist-search__card"
          name={_item.name}
          image={_item.images[1].url}
          popularity={_item.popularity}
          followers={_item.followers.total}
          artistId={_item.id}
        />
      ))}
    </div>
  );
};

export default ArtistSearch;
