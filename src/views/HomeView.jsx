import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const HomeView = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeView;
