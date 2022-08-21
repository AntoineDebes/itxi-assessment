import UseFormContextWrapper from "src/context/UseFormContextWrapper";
import { MainLayout } from "src/layouts";
import { ArtistSearch, Login, HomePage } from "src/pages";

const routesConst = [
  {
    template: <MainLayout />,
    // protectedRoute: <SuperAdminAndAdminProtectedRoute />,
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
    ],
  },
];

export default routesConst;
