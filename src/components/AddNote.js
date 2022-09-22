import React,{useState,useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
    
    const context = useContext(noteContext);
    const {addNote}=context;
   const [note, setNote] = useState({title:"",description:" ",tag:"  "});
    const handleClick=(e)=>{
        // to prevent from being reload
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:" ",tag:""})
    props.showAlert("Added Successfully",'success')

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    
         <div className='container'>
    
    <h2>Add a Note</h2>
    <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Enter the title</label>
  <input type="text" className="form-control" id="title"  value={note.title} name='title'onChange={onChange}  aria-describedby="emailHelp"/>
 

</div>

<div className="mb-3">
  <label htmlFor="description" className="form-label">Enter the description</label>
  <input type="text" className="form-control"  value={note.description} id="description" name='description' onChange={onChange}  />
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Enter the tag</label>
  <input type="text" className="form-control" value={note.tag}   onChange={onChange} id="tag" name='tag' aria-describedby="emailHelp"/>
  
</div>
<button type="submit " disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}

export default AddNote