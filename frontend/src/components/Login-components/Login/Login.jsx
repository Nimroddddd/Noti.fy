import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { SplitText } from "./Welcome/SplitText";
import Zoom from '@mui/material/Zoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const api_url = import.meta.env.VITE_SERVER_URL


function Login(props) {
  const [loginError, setLoginError] = useState("")
  const [loginIntention, setLoginIntention] = useState(true)

  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  function handleEnter(event) {
    if (event.key === "Enter") {
      loginIntention ? handleLogin() : handleRegister()
    }
  }

  function Notify(error) {
    if (loginError !== "") {
      toast(loginError)
      setLoginError("")
    }
  }

  useEffect(() => {Notify()}, [loginError])

  async function handleLogin() {
    try {
      const response = await axios.get(api_url);
      const users = response.data
      try {
        const currentUser = users.find(user => user.username == details.username)
        const userPassword = currentUser.password
        if (details.password == userPassword) {
          props.authentication(currentUser.username)
        } else {
          // wrong password
          setLoginError("Incorrect Password. Try again.")
          setDetails({
            username: details.username,
            password: "",
          })
        }
      } catch (err) {
        // user not found
        setLoginError("User not found!")
        setDetails({
          username: "",
          password: "",
        })
      }
    } catch (err) {
      // direct server down
      setLoginError("Server is down. Please try again later.")
    }
    

  }

  async function handleRegister () {
    if (details.password === details.confirmPassword) {
      try {
        await axios.post(api_url + "register", details);
        setDetails({
          username: "",
          password: "",
          confirmPassword: "",
        })
        setLoginIntention(true)
        setLoginError("Registration Successful!")
      } catch (err) {
        console.log(err.message)
        setDetails({
          username: "",
          password: "",
          confirmPassword: "",
        })
        setLoginIntention(true)
        if (err.message === "Network Error") {
          setLoginError("Server is down!")
        } else {
          setLoginError("User already exists!")
        }
      }
    } else {
      setLoginError("Make sure you write the same password");
      setDetails({
        username: details.username,
        password: "",
        confirmPassword: "",
      })
    }
  }

  function handleRegisterClick(event) {
    console.log(event.target)
    setLoginIntention(false)
    event.preventDefault();
  }

  function handleChange(event) {
    const {name, value} = event.target
    setDetails(prev => {
      return({
        ...prev,
        [name]: value
      })
    })
  }

  return (
    <div className="login">
      <SplitText text="Welcome!" className="welcome" delay={50} />
      <TextField 
          style={{backgroundColor: "#66fcf1"}} 
          name="username" 
          onChange={handleChange} 
          value={details.username} 
          id="outlined-basic" 
          label="Username" 
          variant="outlined"
          onKeyDown={handleEnter}
        />
      <TextField
          name="password"
          style={{backgroundColor: "#66fcf1"}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={details.password}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
      {!loginIntention && <Zoom in={true}><TextField
          name="confirmPassword"
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          style={{backgroundColor: "#66fcf1"}}
          autoComplete="current-password"
          value={details.confirmPassword}
          onChange={handleChange}
          onKeyDown={handleEnter}
        /></Zoom>}
        <Button variant="contained" onClick={loginIntention ? handleLogin : handleRegister}>{loginIntention ? "Login" : "Register"}</Button>
        <p>Don't have an account? <a href="register" onClick={handleRegisterClick} style={{color: "#66fcf1"}}>Sign up here.</a></p>
        <ToastContainer />
    </div>
  )
  
}

export default Login;