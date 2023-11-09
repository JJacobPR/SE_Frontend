import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

class HomeView extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
}

export default HomeView;
