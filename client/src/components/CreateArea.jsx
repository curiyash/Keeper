import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    setNote({
      title: props.title,
      content: props.content
    })
  }, [props]);

  const [expand, setExpand] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    // event.preventDefault();
  }

  function Expanded() {
    setExpand(true);
    // console.log(expand);
  }

  return (
    <div>
      <form className="create-note">
        {expand ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={Expanded}
          value={note.content}
          placeholder="Take a note..."
          rows={expand ? "3" : "1"}
        />
        {expand ? (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;
