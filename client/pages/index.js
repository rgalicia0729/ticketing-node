import React from 'react';
import axios from 'axios';

const Home = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <h1>Home Page</h1>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');

  return response.data;
};

export default Home;