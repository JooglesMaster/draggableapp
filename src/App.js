import React, { Fragment, useState, useEffect, useRef} from "react";
import "./App.css"
import data from "./mock-data.json"
import { nanoid } from 'nanoid'
import ReadOnlyNote from "./components/ReadOnlyNote"
import EditableNote from "./components/EditableNote"

const App = () => {

  const [note, setNote] = useState(data)

  const [addFormData, setAddForm] = useState({
    note: ""
  })

  const [editFormData, setEditForm] = useState({
    note: ""
  })

  const [editNoteId, setEditNoteId] = useState()

  const [positions, setPositions] = useState({})
  const [hasLoaded,setHasLoaded] = useState(false)

  useEffect(()=>{

    const existingDivPositions = JSON.parse(
      localStorage.getItem('positions_note')
    )
    setPositions(existingDivPositions)
    setHasLoaded(true)
  },[])

  function handleStop(e,data){
    console.log('handleStop working')
    let dummyPositions = {...positions}
    const itemId = e.target.id

    dummyPositions[itemId] = {}
    dummyPositions[itemId]["x"] = data.x
    dummyPositions[itemId]["y"] = data.y
    console.log(e.target.id)
    
    setPositions(dummyPositions)

  }

  useEffect(()=>{
    localStorage.setItem('positions_note', JSON.stringify(positions))
  },[positions])

  // const HandleAddFormChange = (event) => {

  //   event.preventDefault()

  //   const fieldName = event.target.getAttribute('name')
  //   const fieldValue = event.target.value

  //   const newFormData = {...addFormData}
  //   newFormData[fieldName] = fieldValue

  //   setAddForm(newFormData)
  // }



  const HandleEditFormChange = (event) => {

    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = {...editFormData}
    newFormData[fieldName] = fieldValue

    setEditForm(newFormData)
  }

  const HandleEditClick = (event,note) =>{

    event.preventDefault()
    setEditNoteId(note.id)

    const formValues = {
      note: note.note
    }

    setEditForm(formValues)

  }

  const HandleEditFormSubmit = (event) => {
      
      event.preventDefault()
  
      const editedNote = {
        id: editNoteId,
        note: editFormData.note
      }
  
      const newNotes = [...note]

      const index = note.findIndex((note) => note.id === editNoteId)

      console.log(index)

      console.log(newNotes)

      newNotes[index] = editedNote

      setNote(newNotes)
      setEditNoteId(null)
  }

  const HandleCancelClick = () => {

    setEditNoteId(null)

  }

  const newNote = note.map((item) => {
      return hasLoaded?(
        <Fragment>
          {editNoteId === item.id ? <EditableNote 
          editFormData={editFormData}
          HandleEditFormChange={HandleEditFormChange}
          HandleCancelClick={HandleCancelClick}
          item={item}
          positions={positions}
          handleStop={handleStop}
          />:          
          <ReadOnlyNote 
          key={item.id}           
          item={item}
          handleEditClick={HandleEditClick} 
          positions={positions}
          handleStop={handleStop}
          />
          }
        </Fragment>
      ): null
   })

  const handleAddFormSubmit = (event) => {

    event.preventDefault()

    const newNote = {
      id: nanoid(),
      note: addFormData.note
    }

    const newNotes = [...note, newNote]
    
    setNote(newNotes)
  }


  
  return (
    <div>
      <h1>Joe Box</h1>
      <div className="note--container">       
        <form onSubmit={HandleEditFormSubmit}>
          {newNote}
        </form>
      </div>
    </div>


  )
}

export default App
