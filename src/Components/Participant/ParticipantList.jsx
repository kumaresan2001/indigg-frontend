import { Participants } from "./Participants.jsx";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
export function ParticipantList() {
  const [participantlist, setParticipantList] = useState([]);
  const getParticipant = () => {
    fetch(`${API}/participant`)
      .then((data) => data.json())
      .then((mvs) => setParticipantList(mvs));
  };

  useEffect(() => getParticipant(), []);
  const deleteParticipant = async (id) => {
    await fetch(`${API}/participant/${id}`, {
      method: "DELETE",
    });
    getParticipant();
  };
  const Navigate = useNavigate();

  return (
    <div>
      <div className="movie-list">
        {participantlist.map((mv) => (
          <Participants
            key={mv._id}
            parti={mv}
            id={mv._id}
            deleteButton={
              <IconButton
                onClick={() => deleteParticipant(mv._id)}
                aria-label="delete"
                sx={{ marginLeft: "auto" }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
            editButton={
              <IconButton
                onClick={() => Navigate(`/participant/edit/${mv._id}`)}
                aria-label="delete"
                sx={{ marginLeft: "auto" }}
                color="secondary"
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
}
