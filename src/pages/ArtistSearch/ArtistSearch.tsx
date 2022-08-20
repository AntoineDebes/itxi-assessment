import { Box, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AxiosApi from "src/assets/axios";
import { ServerUrls } from "src/assets/enums/serverUrls";
import { ArtistCard } from "src/components/Cards";

interface ArtistSearchProps {}

export const ArtistSearch: React.FC<ArtistSearchProps> = ({}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const [artistsResponseData, setArtistsResponseData] = useState<any>({});

  const handleOnchangeFetchArtists: SubmitHandler<any> = async (data) => {
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
    <Box>
      <FormControl onChange={handleSubmit(handleOnchangeFetchArtists)}>
        <TextField {...register("searchName", { required: true })} />
      </FormControl>
      <div>
        {artistsResponseData?.items?.map((_item: any, i: number) => (
          <ArtistCard
            key={i}
            name={_item.name}
            image={_item.images[1].url}
            popularity={_item.popularity}
            followers={_item.followers.total}
            artistId={_item.id}
          />
        ))}
      </div>
    </Box>
  );
};

export default ArtistSearch;
