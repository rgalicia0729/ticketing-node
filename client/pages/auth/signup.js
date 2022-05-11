import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/users/signup', {
      email, password
    });

    console.log(response.data);
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEamil(e.target.value)}
          className='form-control'
        />
      </div>
      <div className='form-group mt-3'>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='form-control'
        />
      </div>
      <button className='btn btn-primary mt-3'>Sign Up</button>
    </form>
  );
};

export default Signup;