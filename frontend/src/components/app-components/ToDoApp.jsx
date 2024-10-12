import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios'
import Notes from "./Notes";
import './App.css'

function ToDoApp (props) {

  const [noteList, setNoteList] = useState([])
  const [input, setInput] = useState("")
  const [refreshState, setRefreshState] = useState("true")
  const username = props.user
  const api_url = import.meta.env.VITE_SERVER_URL

  async function getNotes() {
    const response = await axios.get(api_url + "notes/" + username);
    const result = response.data
    setNoteList(result)
    console.log(result)
  }

  useEffect(() => {getNotes()}, [refreshState])

  function handleInputChange(event) {
    const {value} = event.target;
    setInput(value);
  }

  async function handleAdd(event) {
    await axios.post(api_url + "notes/add", {username: username, note: input});
    setInput("")
    getNotes()
  }

  async function handleComplete(id) {
    // e.stopPropagation();
    console.log(id)
    await axios.delete(api_url + "notes/delete/" + id)
    setRefreshState(prev => {return !prev})
  }


  return (
    <div>
      <Header user={props.user} loggedIn={props.loggedIn} />
      <Notes items={noteList} value={input} handleInputChange={handleInputChange} onAdd={handleAdd} handleComplete={handleComplete} />
    </div>
  )
}



export default ToDoApp;