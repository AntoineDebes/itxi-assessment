import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = ({ children }: any) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
