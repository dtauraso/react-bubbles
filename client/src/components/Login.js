import React, {useState} from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth'
import Loader from 'react-loader-spinner'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [state, setState] = useState({
    credentials: {
      username: '',
      password: ''
    },
    isFetching: false
  })

  const handleChange = e => {

    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }
  const login = e => {
      e.preventDefault();
      setState({
        isFetching: true
      })
      axiosWithAuth()
        .post('/login', state.credentials)
        .then(res => {
          localStorage.setItem('token', res.data.payload)
          props.history.push()
        })
        .catch(err =>  console.log(err))

    }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={login}>
          <input
              type="text"
              name="username"
              value={state.credentials.username}
              onChange={handleChange}

          />
          <input
              type="password"
              name="password"
              value={state.credentials.password}
              onChange={handleChange}

          />
          <button>Log in</button>
          {state.isFetching && 
              <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              //  timeout={3000} //3 secs
  
          /> 
          }
      </form>
    </div>
  );
};

export default Login;
