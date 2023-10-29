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
  const username = localStorage.getItem("advertiser_username");

  const [advertisement, setAdvertisement] = useState<FullAdvertisement>({
    ...defaultFullAdvertisement,
    name: username || "",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    advertisement.description = JSON.stringify({ title, content });
  }, [title, content]);

  const handleLogOut = () => {
    localStorage.removeItem("advertiser_username");
    router.push("/advertiser/login");
  };

  const handlePayment = async () => {
    const apiResult = await fetchFromApi(
      `/advertiser/payment?amount=${paymentAmount}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: username,
          description: advertisement.description,
          investment: paymentAmount,
        }),
      }
    );
    if (apiResult.ok) {
      setAdvertisement({
        ...advertisement,
        investment: paymentAmount,
      });
    }
  };

  const handleEdit = async () => {
    // const apiResult = await fetchFromApi(
    //   ``
  };

  const getAdvertisementFromApi = async (): Promise<FullAdvertisement> => {
    const apiResult = await fetchFromApi(
      `/advertiser/profile?advertiserName=${username}`
    );
    if (apiResult.ok) {
      try {
        const result = await apiResult.json();
        return result;
      } catch (e) {
        return defaultFullAdvertisement;
      }
    }

    return defaultFullAdvertisement;
  };

  useEffect(() => {
    const updateAdvertisement = async () => {
      const newAdvertisement = await getAdvertisementFromApi();
      setAdvertisement(newAdvertisement);
      const { title, content } = JSON.parse(newAdvertisement.description);
      setTitle(title);
      setContent(content);
      setPaymentAmount(newAdvertisement.investment);
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
            />
          </div>
        </div>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="title"
            name="title"
            value={title}
            onChange={
              advertisement.investment === 0
                ? (e) => setTitle(e.target.value)
                : () => {}
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="content"
            name="content"
            value={content}
            onChange={
              advertisement.investment === 0
                ? (e) => setContent(e.target.value)
                : () => {}
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="investment"
            name="investment"
            type="number"
            value={paymentAmount}
            onChange={
              advertisement.investment === 0
                ? (e) => setPaymentAmount(parseInt(e.target.value, 10) || 0)
                : () => {}
            }
          />
          {advertisement.investment === 0 ? (
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Payment
            </Button>
          ) : (
            // <Button variant="contained" color="primary" onClick={handleEdit}>
            //   Edit
            // </Button>
            <></>
          )}
        </Grid>
        <Button variant="contained" color="secondary" onClick={handleLogOut}>
          Logout
        </Button>
      </Grid>
    </Container>
  );
};

export default AdvertiserHomePage;
