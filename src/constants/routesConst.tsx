import { MainLayout } from "src/layouts";
import { ArtistSearch, Login } from "src/pages";

const routesConst = [
  {
    template: <MainLayout />,
    // protectedRoute: <SuperAdminAndAdminProtectedRoute />,
    pages: [
      {
        // context: <ContextRenderingRoute />,
        path: "/login",
        component: <Login />,
      },
      {
        // context: <ContextFormContextRoute />,
        path: "/artist-search",
        component: <ArtistSearch />,
      },
    ],
  },
];

export default routesConst;
