import React from "react";
import Li from "./Li"

function NoteItems(props) {
  

  function appendNotes(note, index) {
    return <Li key={index} value={note.note} handleComplete={() => props.handleComplete(note.id)}/>
  }

  return (
    <div>
      <ul>
        {props.items.map(appendNotes)}
      </ul>
    </div>
  )
}

export default NoteItems;