import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button, Grid, Chip } from "@mui/material";
import Ribbon from "@mui/icons-material/Redeem";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484/${id}`
      );
      setData(res.data);
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, margin: 2, width: "50%" }}>
        <Button size="small" component={Link} to="/">
          Quay lại
        </Button>
        <Box>
          <Typography variant="h4" style={{ textAlign: "center" }} gutterBottom>
            Art Tool Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <img
                  src={data.image}
                  alt={data.artName}
                  style={{ objectFit: "cover", padding: "5px 20px" }}
                  width="100%"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Id:</strong> {data.id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {data.artName}
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ${data.price}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {data.description}
              </Typography>
              <Typography variant="body1">
                <strong>Brand:</strong>
                <Chip
                  label={data.brand}
                  color="secondary"
                  sx={{ ml: 1, fontWeight: "bold", borderRadius: "5px" }}
                />
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <strong>Glass Surface:</strong>
                {data.glassSurface && (
                  <Chip
                    icon={<Ribbon />}
                    label="Glass Surface"
                    color="primary"
                    sx={{ ml: 1, fontWeight: "bold", borderRadius: "5px" }}
                  />
                )}
              </Typography>
              {data.limitedTimeDeal > 0 && (
                <Typography variant="body1">
                  <strong>Limited Time Deal:</strong> {data.limitedTimeDeal}%
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default Detail;
