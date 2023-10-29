"use client";

import Link from "next/link";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AdvertisementCard, {
  FullAdvertisement,
  defaultFullAdvertisement,
} from "@/components/AdvertisementCard";
import { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { fetchFromApi } from "@/components/Util";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    advertisementContainer: {
      justifySelf: "flex-end",
      display: "flex",
    },
  })
);

const AdvertiserHomePage = () => {
  const classes = useStyles();
  const router = useRouter();
  const username = localStorage.getItem("username");

  const [advertisement, setAdvertisement] = useState<FullAdvertisement>(
    defaultFullAdvertisement
  );

  const handleLogOut = () => {
    localStorage.removeItem("username");
    router.push("/advertiser/login");
  };

  const getAdvertisementFromApi = async (): Promise<FullAdvertisement> => {
    const apiResult = await fetchFromApi(
      `/advertiser/profile?advertiserName=${username}`
    );

    return defaultFullAdvertisement;
  };

  useEffect(() => {
    const updateAdvertisement = async () => {
      const newAdvertisement = await getAdvertisementFromApi();
      setAdvertisement(newAdvertisement);
    };

    updateAdvertisement();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome Advertiser
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Your Advertisement
          </Typography>
        </Grid>
        <div className={classes.root}>
          <div className={classes.advertisementContainer}>
            <AdvertisementCard
              name={advertisement.name}
              description={advertisement.description}
              imageUrl=""
            />
          </div>
        </div>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="name"
            name="name"
            value={advertisement.name}
            onChange={(e) =>
              setAdvertisement({ ...advertisement, name: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="description"
            name="description"
            value={advertisement.description}
            onChange={(e) =>
              setAdvertisement({
                ...advertisement,
                description: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdvertiserHomePage;
