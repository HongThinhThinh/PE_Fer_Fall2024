import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [artTools, setArtTools] = useState([]);
  const [currentArtTool, setCurrentArtTool] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtTools = async () => {
      try {
        const res = await axios.get(
          "https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484"
        );
        const sortedArtTools = res.data.sort((a, b) => b.id - a.id);
        setArtTools(sortedArtTools);
      } catch (error) {
        console.error("Error fetching art tools:", error);
      }
    };
    fetchArtTools();
  }, []);

  const handleDelete = async (id) => {
    setConfirmOpen(true);
    setCurrentArtTool(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484/${currentArtTool}`
      );
      setArtTools(artTools.filter((artTool) => artTool.id !== currentArtTool));
      setConfirmOpen(false);
      setOpen(true);
    } catch (error) {
      console.error("Error deleting art tool:", error);
      alert("Failed to delete art tool. Please try again later.");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Art tool deleted successfully!
        </Alert>
      </Snackbar>
      <div style={{ paddingBottom: "10px" }}>
        <Button
          color="primary"
          onClick={() => navigate("/add")}
          style={{ background: "green", color: "white" }}
        >
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Art Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Glass Surface</TableCell>
              <TableCell>Limited Time Deal</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artTools.map((artTool) => (
              <TableRow key={artTool.id}>
                <TableCell>{artTool.id}</TableCell>
                <TableCell>{artTool.artName}</TableCell>
                <TableCell>
                  <img src={artTool.image} width={70} alt={artTool.artName} />
                </TableCell>
                <TableCell>${artTool.price}</TableCell>
                <TableCell>{artTool.description}</TableCell>
                <TableCell>{artTool.brand}</TableCell>
                <TableCell>{artTool.glassSurface ? "Yes" : "No"}</TableCell>
                <TableCell>{artTool.limitedTimeDeal}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/update/${artTool.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(artTool.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this art tool?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            style={{ color: "red" }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Dashboard;
