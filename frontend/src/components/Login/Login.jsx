import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { SplitText } from "./Welcome/SplitText";
import Zoom from '@mui/material/Zoom';


const api_url = import.meta.env.VITE_SERVER_URL


function Login(props) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [greeting, setGreeting] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginIntention, setLoginIntention] = useState(true)
  const [remark, setRemark] = useState(false)

  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  async function handleLogin() {
    try {
      const response = await axios.get(api_url);
      const users = response.data
      try {
        const currentUser = users.find(user => user.username == details.username)
        const userPassword = currentUser.password
        if (details.password == userPassword) {
          setGreeting(`Hello ${currentUser.username}`)
          console.log(greeting)
          setIsAuthenticated(true)
          
        } else {
          console.log("wrong password")
          setRemark(false)
          setLoginError("Incorrect Password. Try again.")
          setDetails({
            username: details.username,
            password: "",
          })
        }
      } catch (err) {
        console.log(err)
        console.log("User not found!")
        setRemark(false)
        setLoginError("User not found!")
        setDetails({
          username: "",
          password: "",
        })
      }
    } catch (err) {
      setRemark(false)
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
        setRemark(true)
        setLoginError("Registration Successful!")
      } catch (err) {
        console.log(err.message)
        setRemark(false)
        setLoginError("User already exists!/Server is down")
        setLoginIntention(true)
        setDetails({
          username: "",
          password: "",
          confirmPassword: "",
        })
      }
    } else {
      setRemark(false)
      setLoginError("Make sure you write the same password");
      setDetails({
        username: details.username,
        password: "",
        confirmPassword: "",
      })
    }
    
    
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

  return isAuthenticated ? 
  <div className="center"><SplitText text={greeting} className="welcome-message" delay={50} /></div> :
  (
    <div className="login">
      <SplitText text="Welcome!" className="welcome" delay={50} />
      <TextField name="username" onChange={handleChange} value={details.username} id="outlined-basic" label="Username" variant="outlined" />
      <TextField
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={details.password}
          onChange={handleChange}
        />
      {!loginIntention && <Zoom in={true}><TextField
          name="confirmPassword"
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          value={details.confirmPassword}
          onChange={handleChange}
        /></Zoom>}
        <Button variant="contained" onClick={loginIntention ? handleLogin : handleRegister}>Submit</Button>
        <div className="action">
          <Button variant="contained" onClick={() => setLoginIntention(true)}>Login</Button>
          <Button variant="contained" onClick={() => setLoginIntention(false)} >Register</Button>
        </div>
        <h2 style={{color: remark ? "green" : "red"}}>{loginError}</h2>
    </div>
  )
}

export default Login;