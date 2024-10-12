import React from "react";
import InputArea from "./InputArea";
import NoteItems from "./NoteItems";

function Notes(props) {
  return (
    <div className="notes">
      <InputArea value={props.value} handleInputChange={props.handleInputChange} onAdd={props.onAdd} />
      <NoteItems items={props.items} handleComplete={props.handleComplete} />
    </div>
  )
}

export default Notes;