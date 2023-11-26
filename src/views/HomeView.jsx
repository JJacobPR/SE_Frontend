import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from 'axios';

class HomeView extends Component {
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
