import { Tournaments } from "./Tournaments.jsx";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
export function TournamentList() {
  const [tournamentlist, setTournamentList] = useState([]);
  const getTournament = () => {
    fetch(`${API}/tournament`)
      .then((data) => data.json())
      .then((mvs) => setTournamentList(mvs));
  };

  useEffect(() => getTournament(), []);
  const deleteTournament = async (id) => {
    await fetch(`${API}/tournament/${id}`, {
      method: "DELETE",
    });
    getTournament();
  };
  const Navigate = useNavigate();

  return (
    <div>
      <div className="movie-list">
        {tournamentlist.map((mv) => (
          <Tournaments
            key={mv._id}
            tourn={mv}
            id={mv._id}
            deleteButton={
              <IconButton
                onClick={() => deleteTournament(mv._id)}
                aria-label="delete"
                sx={{ marginLeft: "auto" }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
            editButton={
              <IconButton
                onClick={() => Navigate(`/tournament/edit/${mv._id}`)}
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
