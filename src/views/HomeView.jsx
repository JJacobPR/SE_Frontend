import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from 'axios';

class HomeView extends Component {
  async componentDidMount() {
    try {
      // Make a GET request to "/api/csrf-cookie"
      const response = await axios.get('/api/csrf-cookie');

      const xsrfToken = response.headers['set-cookie'];

      console.log('XSRF Token:', xsrfToken);

    } catch (error) {
      // Handle errors if the request fails
      console.error('Error setting CSRF Cookie:', error);
    }
  }
  

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
