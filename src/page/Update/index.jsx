import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const brands = ["KingArt", "Color Splash", "Edding", "Arteza"];

const Add = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    setValue,
    formState: { errors: addErrors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484/${id}`
        );
        const { data } = response;
        if (data) {
          // Pre-fill form fields with existing data
          setValue("artName", data.artName);
          setValue("image", data.image);
          setValue("description", data.description);
          setValue("glassSurface", data.glassSurface);
          setValue("price", data.price);
          setValue("brand", data.brand);
          setValue("limitedTimeDeal", data.limitedTimeDeal);
          setIsUpdate(true);
        }
      } catch (error) {
        console.error("Error fetching art tool:", error);
        alert("Failed to fetch art tool. Please try again later.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const handleAddSubmitForm = async (data) => {
    try {
      if (isUpdate) {
        // Update existing art tool
        await axios.put(
          `https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484/${id}`,
          data
        );
      }
      resetAddForm();
      setOpen(true);
    } catch (error) {
      console.error("Error adding/updating art tool:", error);
      alert("Failed to add/update art tool. Please try again later.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
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
          {isUpdate
            ? "Art tool updated successfully!"
            : "Art tool added successfully!"}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: 500,
          p: 4,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{isUpdate ? "Update Art Tool" : "Add Art Tool"}</h2>
        <form onSubmit={handleAddSubmit(handleAddSubmitForm)}>
          <Controller
            name="artName"
            control={addControl}
            defaultValue=""
            rules={{
              required: "Art Name is required",
              validate: (value) =>
                value.split(" ").length > 1 ||
                "Art Name must have more than 1 word and be lowercase",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Art Name"
                fullWidth
                margin="normal"
                error={!!addErrors.artName}
                helperText={addErrors.artName ? addErrors.artName.message : ""}
              />
            )}
          />
          <Controller
            name="image"
            control={addControl}
            defaultValue=""
            rules={{
              required: "Image URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Image must be a valid URL (e.g., http|ftp|https:)",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                fullWidth
                margin="normal"
                error={!!addErrors.image}
                helperText={addErrors.image ? addErrors.image.message : ""}
              />
            )}
          />
          <Controller
            name="description"
            control={addControl}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!addErrors.description}
                helperText={
                  addErrors.description ? addErrors.description.message : ""
                }
              />
            )}
          />
          <Controller
            name="glassSurface"
            control={addControl}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} />}
                label="Glass Surface"
              />
            )}
          />
          <Controller
            name="price"
            control={addControl}
            defaultValue=""
            rules={{
              required: "Price is required",
              validate: (value) =>
                parseFloat(value) >= 10 || "Price must be at least 10",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                error={!!addErrors.price}
                helperText={addErrors.price ? addErrors.price.message : ""}
              />
            )}
          />
          <Controller
            name="brand"
            control={addControl}
            defaultValue=""
            rules={{ required: "Brand is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                SelectProps={{ native: true }}
                error={!!addErrors.brand}
                helperText={addErrors.brand ? addErrors.brand.message : ""}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="limitedTimeDeal"
            control={addControl}
            defaultValue=""
            rules={{
              validate: (value) =>
                parseFloat(value) >= 0 ||
                "Limited Time Deal must be a positive number",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Limited Time Deal"
                type="number"
                fullWidth
                margin="normal"
                error={!!addErrors.limitedTimeDeal}
                helperText={
                  addErrors.limitedTimeDeal
                    ? addErrors.limitedTimeDeal.message
                    : ""
                }
              />
            )}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              paddingTop: "20px",
            }}
          >
            <Button
              color="primary"
              onClick={() => navigate("/dashboard")}
              style={{ background: "red", color: "white", width: "50%" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              style={{ background: "green", color: "white", width: "50%" }}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default Add;
