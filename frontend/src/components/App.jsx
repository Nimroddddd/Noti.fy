import React, { useState } from "react";
// import Login from "./Login-components/Login/Login";
import ToDoApp from "./app-components/ToDoApp";
import LoginApp from "./Login-components/LoginApp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  function handleAuthentication(user) {
    setIsAuthenticated(true)
    setCurrentUser(user)
    console.log(user)
  }

  function handleLogout() {
    setIsAuthenticated(false)
  }

  return isAuthenticated ? <ToDoApp user={currentUser} loggedIn={isAuthenticated} logout={handleLogout} /> : <LoginApp authentication={handleAuthentication} loggedIn={isAuthenticated} />
}

export default App;