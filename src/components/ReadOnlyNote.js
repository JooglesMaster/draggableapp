import React from 'react'
import Draggable from 'react-draggable'

export default function ReadOnlyNote (props){
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
    <div className='note--box' id={props.item.id}>
      <div className="action handle" id={props.item.id}>
              <button 
              type="submit"
              onClick={(event) => props.handleEditClick(event,props.item)}>Edit
              </button>            
          </div>      
        <div className="note" id={props.item.id}>
            <p id={props.item.id}>{props.item.note}</p>
        </div>
    </div>
    </Draggable>
  )
}

