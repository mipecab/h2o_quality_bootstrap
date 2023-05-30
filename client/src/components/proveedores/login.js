import React, { useState } from 'react'
import '../style.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
      });
      const data = await response.json();

      if (data.Status === 'Success') {
        navigate('/');
      } else {
        setError(data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className='form-control rounded-0'
              autoComplete='off'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className='form-control rounded-0'
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Log in
          </button>
          <p>You are agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
