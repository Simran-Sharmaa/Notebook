import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);

    const {note,updateNote}=props;
    const {deleteNote}=context;
    
  return (
    <div className='col-md-3 my-3'>
        <div className="card" >
  
  <div className="card-body ">
    <div className='d-flex mx-2'>
    <h5 className="card-title"> {note.title}</h5>     
    <i className="fa fa-pencil-square-o ms-4 mt-1" onClick={()=>{updateNote(note)}} ></i>
    <i className="fa fa-trash-o mx-3 mt-1" onClick={()=>{deleteNote(note._id);
    props.showAlert("Deleted Successfully",'success')
    
    }}></i>
    </div>
    <p className="card-text mx-2"> {note.description}  
    {/* Some quick example text to build on the card title and make up the bulk of the card's content. */}
    </p>
    

    </div>
</div>
    </div>
  )
}

export default NoteItem