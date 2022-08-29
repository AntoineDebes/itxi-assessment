// import { AppDataStoreContextProvider } from "src/context/AppDataStore";
import IsUserLogedInProtectedRoute from "src/components/ProtectedRoutes/AdminProtectedRoute";
import UseFormContextWrapper from "src/context/UseFormContextWrapper";
import { MainLayout } from "src/layouts";
import { ArtistSearch, Login, HomePage, ArtistAlbumSearch } from "src/pages";
import SpotifyCallback from "src/pages/SpotifyCallback/SpotifyCallback";

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
        path: "/spotify-callback",
        component: <SpotifyCallback />,
      },
    ],
  },
  {
    template: <MainLayout />,
    // globalSectionContext: <AppDataStoreContextProvider />,
    protectedRoute: <IsUserLogedInProtectedRoute />,
    pages: [
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
