import { Outlet } from "react-router-dom";

const MainLayout = ({ children }: any) => {


  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
