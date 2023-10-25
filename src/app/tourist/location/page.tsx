"use client";

import React, { useState } from "react";
import { Button, Container, Typography, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

type GeoLocation = {
  latitude: number;
  longitude: number;
};

const TouristLocationPage = () => {
  const router = useRouter();

  let location = localStorage.getItem("location") || "default location";
  const setLocation = (newLocation: string) => {
    localStorage.setItem("location", newLocation);
    location = newLocation;
  };

  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: 0,
    longitude: 0,
  });
  const [tempLocation, setTempLocation] = useState<string>(location);

  const saveLocation = () => {
    console.log("Location saved:", tempLocation);
    setLocation(tempLocation);
    router.push("/tourist/home");
  };

  const getLocationFromGeoLocationFromApi = async (
    geoLocation: GeoLocation
  ): Promise<string> => {
    return "from geoLocation";
  };

  const handleGetLocationFromGeoLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ latitude, longitude });

          const newLocation = await getLocationFromGeoLocationFromApi({
            latitude,
            longitude,
          });
          setTempLocation(newLocation);
          console.log(newLocation);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported in your browser");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Select Your Location</Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} display={"flex"} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetLocationFromGeoLocation}
          >
            Get Current Location
          </Button>
          <Typography variant="body1" margin="10px">
            Or type the the location you currently at
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Your Location"
            name="location"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
          />
        </Grid>
      </Grid>

      {geoLocation && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveLocation()}
          >
            Confirm Location and Back
          </Button>
        </div>
      )}
    </Container>
  );
};

export default TouristLocationPage;
