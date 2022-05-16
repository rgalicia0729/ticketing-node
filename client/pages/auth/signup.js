import React, { useState } from 'react';
import Router from 'next/router';

import { useRequest } from '../../hooks/use-request';

const Signup = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    method: 'post',
    url: '/api/users/signup',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
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
          type='password'
          className='form-control'
        />
      </div>
      {errors}
      <button className='btn btn-primary mt-3'>Sign Up</button>
    </form>
  );
};

export default Signup;