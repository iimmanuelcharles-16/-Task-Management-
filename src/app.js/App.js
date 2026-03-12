import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  createTheme,
  ThemeProvider
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Custom Theme with Gradient Background
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#00d4ff' },
      secondary: { main: '#a855f7' },
      background: { 
        default: 'linear-gradient(135deg, #0c0f23 0%, #1a0d2e 30%, #0f4c5a 70%, #00d4ff 100%)'
      }
    }
  });

  // Load tasks from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) {
      setTasks(saved);
      setFilteredTasks(saved);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setFilteredTasks(tasks.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    ));
  }, [tasks, search]);

  // Add or Update task
  const addTask = () => {
    if (task.trim() === "" || description.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { title: task, description };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { title: task, description }]);
    }

    setTask("");
    setDescription("");
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Edit task
  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditIndex(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0c0f23 0%, #1a0d2e 30%, #0f4c5a 70%, #00d4ff 100%)",
          backgroundAttachment: "fixed",
          py: 5,
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated Particles Background */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #00d4ff, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(168, 85, 247, 0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, #10b981, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px",
            animation: "float 20s infinite linear",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Paper 
            elevation={10} 
            sx={{ 
              padding: 4, 
              marginTop: 5,
              borderRadius: "2rem",
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800
              }}
            >
              🚀 Task Management  
            </Typography>

            {/* Search Bar */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 500 }}>
                <TextField
                  fullWidth
                  label="🔍 Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "1rem",
                      backdropFilter: "blur(10px)"
                    }
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    borderRadius: "1rem",
                    minWidth: "auto",
                    px: 3
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            {/* Add Task Form */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "white", mb: 2 }}>
                ➕ Add New Task
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
                <TextField
                  fullWidth
                  label="Task Title"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  multiline
                  rows={1}
                  sx={{
    flex: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px"
    }
  }}
                  
                />
                
                
               <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  
                  rows={1}
                  sx={{
    flex: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px"
    }
  }}
                />
                
                
                
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={addTask}
                  sx={{
                    borderRadius: "1rem",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  {editIndex !== null ? "Update" : "Add Task"}
                </Button>
              </Box>
            </Box>

            {/* Task Counter */}
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Chip 
                label={`${filteredTasks.length} Tasks`} 
                color="primary" 
                variant="filled"
                sx={{ fontSize: "1.1rem", fontWeight: 600 }}
              />
            </Box>

            {/* Task List */}
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {filteredTasks.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No tasks found" 
                    secondary="Add your first task above!"
                    sx={{ color: "rgba(255,255,255,0.7)", textAlign: "center", width: "100%" }}
                  />
                </ListItem>
              ) : (
                filteredTasks.map((t, index) => (
                  <ListItem
                    key={index}
                    component={Paper}
                    sx={{ 
                      mb: 2, 
                      borderRadius: "1rem",
                      backdropFilter: "blur(10px)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease"
                    }}
                    secondaryAction={
                      <>
                        <IconButton
                          color="primary"
                          edge="end"
                          onClick={() => editTask(index)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          edge="end"
                          onClick={() => deleteTask(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                            {t.title}
                          </Typography>
                        } 
                      />
                      <ListItemText 
                        secondary={
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "rgba(255,255,255,0.8)", 
                              fontSize: "0.95rem",
                              mt: 0.5
                            }}
                          >
                            {t.description}
                          </Typography>
                        }
                      />
                    </Box>
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Container>

        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(360deg); }
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
}

export default App;

