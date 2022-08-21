import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = ({ children }: any) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
