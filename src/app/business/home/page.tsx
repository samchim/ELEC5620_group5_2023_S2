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
    advertisementRow: {
      display: "flex",
      width: "80%",
      marginBottom: "1rem",
      alignItems: "center",
    },
    advertisementContainer: {
      display: "flex",
      marginRight: "2rem",
      flex: 1,
    },
  })
);

const BusinessHomePage = () => {
  const classes = useStyles();
  const router = useRouter();
  const username = localStorage.getItem("business_username");

  const [advertisementList, setAdvertisementList] = useState<
    FullAdvertisement[]
  >([]);

  const handleApprove = async (
    advertisement: FullAdvertisement,
    approve: boolean
  ) => {
    const apiResult = await fetchFromApi(
      `/business/advertise/${approve ? "approve" : "disapprove"}`,
      {
        method: "POST",
        body: JSON.stringify(advertisement),
      }
    );

    if (apiResult.ok) {
      const newAdvertisementList = { ...advertisement, approved: approve };
      setAdvertisementList(
        advertisementList.map((advertisement) => {
          if (advertisement.id === newAdvertisementList.id) {
            return newAdvertisementList;
          }

          return advertisement;
        })
      );
    }
  };

  const getAdvertisementListFromApi = async () => {
    const apiResult = await fetchFromApi(`/business/advertise`, {
      method: "POST",
    });

    if (apiResult.ok) {
      try {
        const result = await apiResult.json();
        return result;
      } catch (e) {
        return [];
      }
    }

    return [];
  };

  useEffect(() => {
    const updateAdvertisement = async () => {
      const newAdvertisementList = await getAdvertisementListFromApi();
      setAdvertisementList(newAdvertisementList);
    };

    updateAdvertisement();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("business_username");
    router.push("/business/login");
  };

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome Admin
        </Typography>
      </Grid>
      <div className={classes.root}>
        {advertisementList.map((advertisement) => {
          return (
            <div className={classes.advertisementRow}>
              <div className={classes.advertisementContainer}>
                <AdvertisementCard
                  name={advertisement.id}
                  description={advertisement.description}
                />
              </div>
              <Typography>
                {advertisement.approved ? "Approved" : "Not Approved"}
              </Typography>
              {advertisement.approved ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(advertisement, false)}
                >
                  Disapprove
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(advertisement, true)}
                >
                  Approve
                </Button>
              )}
            </div>
          );
        })}

        <Button variant="contained" color="secondary" onClick={handleLogOut}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default BusinessHomePage;
