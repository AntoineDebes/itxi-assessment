// import { AppDataStoreContextProvider } from "src/context/AppDataStore";
import UseFormContextWrapper from "src/context/UseFormContextWrapper";
import { MainLayout } from "src/layouts";
import { ArtistSearch, Login, HomePage, ArtistAlbumSearch } from "src/pages";

const routesConst = [
  {
    template: <MainLayout />,
    // globalSectionContext: <AppDataStoreContextProvider />,
    pages: [
      {
        context: <UseFormContextWrapper />,
        path: "/",
        component: <HomePage />,
      },
      {
        context: <UseFormContextWrapper />,
        path: "/login",
        component: <Login />,
      },
      {
        context: <UseFormContextWrapper />,
        path: "/artist-search",
        component: <ArtistSearch />,
      },
      {
        context: <UseFormContextWrapper />,
        path: "/artist-album:artistID/:artistName",
        component: <ArtistAlbumSearch />,
      },
    ],
  },
];

export default routesConst;
