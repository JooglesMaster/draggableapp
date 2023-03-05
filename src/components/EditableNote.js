import React from 'react'
import Draggable from 'react-draggable'

export default function EditableNote (props){
  return (
    <Draggable
      defaultPosition={
        props.positions === null
          ? { x: 0, y: 0 }
          : !props.positions[props.item.id]
          ? { x: 0, y: 0 }
          : { x: props.positions[props.item.id].x, y: props.positions[props.item.id].y }
      }
      position={null}
      key={props.item.id}
      onStop={props.handleStop}
      handle={'.handle'}          
    >
      <div className="note--box">
      <div className="action">
            <button 
            type="submit"
            >
            Save Note</button>
            <button 
            onClick={props.handleCancelClick}
            >
            Cancel</button>
          </div>        
          <div className="note">
            <textarea 
            type="text" 
            name="note" 
            id="note"
            className='note--edit'
            value={props.editFormData.note}
            onChange={props.HandleEditFormChange}
            />
          </div>
      </div>
    </Draggable>
  )
}

