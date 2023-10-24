"use client";

import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type GeoLocation = {
  latitude: number;
  longitude: number;
};

const TouristLocationPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: 0,
    longitude: 0,
  });

  const getLocationFromGeoLocation = async (
    geoLocation: GeoLocation
  ): Promise<string> => {
    return "from geoLocation";
  };

  const saveLocation = (location: string) => {
    // You can save the location to your context (touristContext) here
    console.log("Location saved:", location);
  };

  const handleGetLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ latitude, longitude });

          const newLocation = await getLocationFromGeoLocation({
            latitude,
            longitude,
          });
          setLocation(newLocation);
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
      <Button variant="contained" color="primary" onClick={handleGetLocation}>
        Get Current Location
      </Button>
      {geoLocation && (
        <div>
          <Typography variant="body1">Location: {location}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveLocation(location)}
          >
            Confirm Location and Back
          </Button>
        </div>
      )}
    </Container>
  );
};

export default TouristLocationPage;
