import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export function Participants({ parti, id, deleteButton, editButton }) {
  const [show, setshow] = useState(true);

  const summarystyle = {
    display: show ? "block" : "none",
  };

  return (
    <Card className="movie-container">
      <img className="movie-poster" src={parti.images} alt={parti.partname} />
      <CardContent>
        <div className="movie-specs">
          <h2 className="movie-name">
            {parti.partname}
            <IconButton
              color="primary"
              onClick={() => setshow(!show)}
              aria-label="movie details"
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </h2>
          <p className="movie-rating">{parti.status}</p>
        </div>

        <p style={summarystyle} className="movie-summry">
          <h2>Game</h2>

          {parti.tourname}
        </p>
        <CardActions>
          {deleteButton}
          {editButton}
        </CardActions>
      </CardContent>
    </Card>
  );
}
