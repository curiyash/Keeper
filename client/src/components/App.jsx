// import React, { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import Note from "./Note";
// import CreateArea from "./CreateArea";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [id, setId] = useState(0);

//   async function addNote(newNote) {
//     await fetch("http://localhost:5000/note/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newNote),
//     })
//     .catch(error =>{
//       window.alert(error);
//       return;
//     });
//     setNotes(prevNotes => {
//       return [...prevNotes, newNote];
//     });
//   }

//   async function deleteNote(id) {
//     await fetch(`http://localhost:5000/${id}`, {
//       method: "DELETE"
//     });
//     setNotes(prevNotes => {
//       return prevNotes.filter((noteItem, index) => {
//         return index !== id;
//       });
//     });
//   }
//   return (
//     <div>
//       <Header />
//       <CreateArea onAdd={addNote} id={id} onSetId={setId}/>
//       {notes.map((noteItem, index) => {
//         return (
//           <Note
//             key={index}
//             id={index}
//             title={noteItem.title}
//             content={noteItem.content}
//             onDelete={deleteNote}
//           />
//         );
//       })}
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React from "react";

// Define routes of application
import { Route, Routes } from "react-router-dom";

// Import components
import NoteList from "./Notes";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<NoteList />} />
            </Routes>
        </div>
    );
};

export default App;

