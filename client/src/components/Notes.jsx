import React, { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import Note from "./Note";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from '@mui/icons-material/Edit';

// const Note = (props) => (
//   <tr>
//     <td>{props.note.title}</td>
//     <td>{props.record.position}</td>
//     <td>{props.record.level}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//       <button className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

const Note = (props) => (
    <div className="note">
      <h1>{props.note.title}</h1>
      <p>{props.note.content}</p>
      <button onClick={() => {
          props.deleteNote(props.note.key);
      }}>
        <DeleteIcon />
      </button>
      <button onClick={() => {
          props.editNote(props);
      }}>
        Edit
      </button>
    </div>
);


export default function NoteList() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // This method fetches the records from the database.
  async function getNotes() {
    const response = await fetch(`http://localhost:5000/note/`);

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const notes = await response.json();
    setNotes(notes);
  }

  useEffect(() => {
    getNotes();

    return; 
  }, [notes.length]);

  // This method will delete a record
  async function deleteNote(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newNotes = notes.filter((el) => el._id !== id);
    setNotes(newNotes);
    navigate("/");
  }

  async function editNote(note) {
    console.log(`editNote ${note._id}`);
    setTitle(note.title);
    setContent(note.content);
    setEdit({
      status: true,
      id: note._id
    })
    navigate("/");
  }

  // This method will map out the records on the table
  function noteList() {
    return notes.map((note) => {
      return (
        <Note
          note={note}
          deleteNote={() => deleteNote(note._id)}
          editNote={() => editNote(note)}
          key={note._id}
        />
      );
    });
  }

  const [edit,setEdit] = useState({
    status: false,
    id: null
  });

  async function addNote(newNote) {
    // Determine if edit or add
    if (edit.status===true){
      console.log("Under edit");
      console.log(`${edit.id}`);

      await fetch(`http://localhost:5000/update/${edit.id}`, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setEdit({
        status: false,
        id: null
      })
      getNotes();
    } else{
      console.log("Under edit");
      await fetch("http://localhost:5000/note/add", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
      })
      .catch(error =>{
          window.alert(error);
          return;
      });
      setNotes(prevNotes => {
          return [...prevNotes, newNote];
      });
    }
    setTitle("");
    setContent("");
    navigate("/");
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} title={title} content={content}/>
      {noteList()}
      <Footer />
    </div>
  );
}