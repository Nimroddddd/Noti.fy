import React, { useState } from "react";
import Login from "./Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return <Login />
}

export default App;