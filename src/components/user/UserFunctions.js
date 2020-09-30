import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const register = newUser => {
  return axios
    .post(`${REACT_APP_SERVER_URL}/api/users/register`, {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post(`${REACT_APP_SERVER_URL}/api/users/login`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log('Is logged in')
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}