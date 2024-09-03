import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchArtTools = async () => {
      try {
        const response = await axios.get(
          "https://66938e95c6be000fa07c1c9a.mockapi.io/artTools/DungLTSE170484"
        );
        const filteredData = response.data.filter(
          (item) => item.limitedTimeDeal == 0
        );
        console.log(filteredData);
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchArtTools();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {data.map((artTool) => (
        <Grid item key={artTool.id} xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={artTool.image}
              title={artTool.artName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {artTool.artName} <br />
                {artTool.price} USD
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link to={`/detail/${artTool.id}`}>
                  <strong>ID:</strong> {artTool.id}
                </Link>
                <br />
                <strong>Description:</strong> {artTool.description}
                <br />
                <strong>Brand:</strong> {artTool.brand}
                <br />
                <strong>Glass Surface:</strong>{" "}
                {artTool.glassSurface ? "Yes" : "No"}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to={`/detail/${artTool.id}`}
              >
                Detail
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
