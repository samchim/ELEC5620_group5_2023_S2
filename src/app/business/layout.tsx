"use client";

import AdvertisementCard, {
  TouristAdvertisement,
} from "@/components/AdvertisementCard";
import { createStyles, makeStyles } from "@mui/styles";
import { usePathname, useRouter } from "next/navigation";
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
  })
);

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const username = localStorage.getItem("business_username");
    console.log(pathname);
    if (
      !username &&
      !["/business/signup", "business/login"].includes(pathname)
    ) {
      router.push("/business/login");
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default BusinessLayout;
