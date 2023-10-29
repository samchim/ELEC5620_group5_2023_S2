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
};

export const defaultTouristAdvertisement: TouristAdvertisement = {
  name: "loading...",
  description: JSON.stringify({ title: "loading...", content: "loading..." }),
};

export type FullAdvertisement = {
  id: string;
  investment: number;
  approved: boolean;
} & TouristAdvertisement;

export const defaultFullAdvertisement: FullAdvertisement = {
  id: "loading...",
  investment: 0,
  approved: false,
  name: "name",
  description: JSON.stringify({ title: "title", content: "content" }),
};

export default function AdvertisementCard(props: TouristAdvertisement) {
  const { name, description } = props;
  const { title, content } = JSON.parse(description);
  return (
    <Card>
      {/* <Image
        alt="Random image"
        src={imageUrl}
        width={640}
        height={480}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
