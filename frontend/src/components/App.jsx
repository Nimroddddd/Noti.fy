import React, { useState } from "react";
import Login from "./Login/Login";
import ToDoApp from "./app-components/App";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  function handleAuthentication(user) {
    setIsAuthenticated(true)
    setCurrentUser(user)
    console.log(user)
  }

  return isAuthenticated ? <ToDoApp user={currentUser} /> : <Login authentication={handleAuthentication} />
}

export default App;