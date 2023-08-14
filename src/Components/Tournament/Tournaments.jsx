import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export function Tournaments({ tourn, id, deleteButton, editButton }) {
  const [show, setshow] = useState(true);

  const summarystyle = {
    display: show ? "block" : "none",
  };

  return (
    <Card className="movie-container">
      <img className="movie-poster" src={tourn.images} alt={tourn.tourname} />
      <CardContent>
        <div className="movie-specs">
          <h2 className="movie-name">
            {tourn.tourname}
            <IconButton
              color="primary"
              onClick={() => setshow(!show)}
              aria-label="movie details"
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </h2>
          <p className="movie-rating">{tourn.status}</p>
        </div>
        <h3> Date:{tourn.date}</h3>

        <p style={summarystyle} className="movie-summry">
          <h2>Participant</h2>
          <ol>
            <h3>
              <li>{tourn.partname1}</li>
              <li>{tourn.partname2}</li>
              <li>{tourn.partname3}</li>
              <li>{tourn.partname4}</li>
            </h3>
          </ol>
        </p>
        <CardActions>
          {deleteButton}
          {editButton}
        </CardActions>
      </CardContent>
    </Card>
  );
}
