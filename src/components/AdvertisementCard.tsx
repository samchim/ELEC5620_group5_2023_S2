import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { propagateServerField } from "next/dist/server/lib/render-server";

export type TouristAdvertisement = {
  name: string;
  description: string;
  imageUrl: string;
};

export const defaultTouristAdvertisement: TouristAdvertisement = {
  name: "loading...",
  description: "loading...",
  imageUrl: "",
};

export type FullAdvertisement = {
  id: string;
  investment: number;
  isApproved: boolean;
} & TouristAdvertisement;

export const defaultFullAdvertisement: FullAdvertisement = {
  id: "loading...",
  investment: 0,
  isApproved: false,
  name: "name",
  description: "description",
  imageUrl: "",
};

export default function AdvertisementCard(props: TouristAdvertisement) {
  const { name, description, imageUrl } = props;
  return (
    <Card>
      <Image
        alt="Random image"
        src={imageUrl}
        width={640}
        height={480}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
