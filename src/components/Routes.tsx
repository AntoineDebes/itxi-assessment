import { FC } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import routesConst from "src/constants/routesConst";

// const WorksetConfirm = lazy(
//   () => import("src/pages/Onboard/WorksetConfirm/WorksetConfirm")
// );

const Routes: FC = () => {
  return (
    <>
      <ReactRoutes>
        {routesConst.map((_item: any, _i: number) => (
          <Route key={_i} element={_item.globalSectionContext}>
            <Route element={_item.template}>
              <Route element={_item.protectedRoute}>
                {_item.pages.map((__item: any, __i: number) => (
                  <Route key={`sub-${__i}`} element={__item.context}>
                    <Route path={__item.path} element={__item.component} />
                  </Route>
                ))}
              </Route>
            </Route>
          </Route>
        ))}
      </ReactRoutes>
    </>
  );
};

export default Routes;
