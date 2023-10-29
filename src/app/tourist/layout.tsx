"use client";

import AdvertisementCard, {
  TouristAdvertisement,
  defaultTouristAdvertisement,
} from "@/components/AdvertisementCard";
import { fetchFromApi } from "@/components/Util";
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
    advertisementContainer: {
      justifySelf: "flex-end",
      display: "flex",
    },
  })
);

const TouristLayout = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const [advertisement, setAdvertisement] = useState<TouristAdvertisement>(
    defaultTouristAdvertisement
  );
  const router = useRouter();
  const pathname = usePathname();

  const getAdvertisementFromApi = async () => {
    const apiResult = await fetchFromApi(`/tourist/listAdvertisers`);
    if (apiResult.ok) {
      const advertiserList = await apiResult.json();

      let maxInvestment = 0;
      let maxIndex = 0;
      for (let index = 0; index < advertiserList.length; index++) {
        const advertiser = advertiserList[index];
        if (advertiser.investment > maxInvestment && advertiser.approved) {
          maxInvestment = advertiser.investment;
          maxIndex = index;
        }
      }

      return advertiserList[maxIndex];
    }

    return defaultTouristAdvertisement;
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(pathname);
    if (!username && !["/tourist/signup", "tourist/login"].includes(pathname)) {
      router.push("/tourist/login");
    }

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
        />
      </div>
    </div>
  );
};

export default TouristLayout;
