import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { addWidget, updateWidget } from "../../lib/apiConnect";
const DEFAULT_WIDGET = { name: "", description: "", price: "" };

const AddWidget = ({ open, onClose, onWidgetAddSuccess, widget }) => {
  const { name, description, price } = widget || DEFAULT_WIDGET;
  const [newWidget, setNewWidget] = useState({ name, description, price });
  const [error, setError] = useState("");

  const handleAddWidget = async () => {
    try {
      if (!newWidget.name || !newWidget.description || !newWidget.price) {
        alert("Please fill all fields!");
        return;
      }

      widget ? await updateWidget(newWidget) : await addWidget(newWidget);
      onWidgetAddSuccess();
      setNewWidget(DEFAULT_WIDGET);
      onClose();
    } catch (e) {
      console.log(e);
      if (e?.response?.status === 400) {
        setError(e?.response?.data[0] || "Please enter valid values.");
        return;
      }
      setError("Internal error occurred.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            value={newWidget.name}
            onChange={(e) =>
              setNewWidget({ ...newWidget, name: e.target.value })
            }
            disabled={widget}
          />
          <TextField
            label="Description"
            value={newWidget.description}
            onChange={(e) =>
              setNewWidget({ ...newWidget, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={newWidget.price}
            onChange={(e) =>
              setNewWidget({ ...newWidget, price: e.target.value })
            }
          />
        </Stack>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddWidget}>
          {widget ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWidget;
