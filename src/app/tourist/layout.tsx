"use client";

import AdvertisementCard, {
  TouristAdvertisement,
} from "@/components/AdvertisementCard";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    },
    content: {
      flex: 1,
      width: "100%",
    },
    advertisementContainer: {
      justifySelf: "flex-end",
      display: "flex",
    },
  })
);

const defaultAdvertisement: TouristAdvertisement = {
  name: "loading...",
  description: "loading...",
  imageUrl: "",
};

const TouristLayout = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const [advertisement, setAdvertisement] =
    useState<TouristAdvertisement>(defaultAdvertisement);

  const getAdvertisementFromApi = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      name: "advertisement from api",
      description: "advertisement from api",
      imageUrl: "",
    } as TouristAdvertisement;
  };

  useEffect(() => {
    const updateAdvertisement = async () => {
      const newAdvertisement = await getAdvertisementFromApi();
      setAdvertisement(newAdvertisement);
    };

    updateAdvertisement();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <div className={classes.advertisementContainer}>
        <AdvertisementCard
          name={advertisement.name}
          description={advertisement.description}
          imageUrl={advertisement.imageUrl}
        />
      </div>
    </div>
  );
};

export default TouristLayout;
