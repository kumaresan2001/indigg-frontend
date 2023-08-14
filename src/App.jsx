import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { TournamentList } from "./components/Tournament/TournamentList.jsx";
import { ParticipantList } from "./Components/Participant/ParticipantList.jsx";
import { Addtournament } from "./Components/Tournament/Addtournament.jsx";

function App() {
  const Navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const bgstyles = {
    borderRadius: "0px",
    minHeight: "100vh",
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={bgstyles} elevation={4}>
        <div className="app">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => Navigate("*")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => Navigate("/tournament")}>
                Tournament
              </Button>
              <Button
                color="inherit"
                onClick={() => Navigate("/tournament/add")}
              >
                AddTournament
              </Button>
              <Button color="inherit" onClick={() => Navigate("/participant")}>
                Participant
              </Button>

              <Button
                color="inherit"
                variant="containd"
                startIcon={
                  mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                sx={{ marginLeft: "auto" }}
              >
                {mode === "dark" ? "light" : "dark"}mode
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/tournament" element={<TournamentList />} />
            <Route path="/participant" element={<ParticipantList />} />
            <Route path="/tournament/add" element={<Addtournament />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
function NotFound() {
  return (
    <div>
      <h1>Welcome to App</h1>
    </div>
  );
}
