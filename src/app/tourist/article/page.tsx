"use client";

import { MessageLeft, MessageRight } from "@/components/Message";
import { fetchFromApi } from "@/components/Util";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TouristArticlePage = () => {
  const [article, setArticle] = useState<string>("loading...");
  const router = useRouter();
  const location = localStorage.getItem("location");

  const getArticleFromApi = async () => {
    if (!location) {
      router.push("/tourist/location");
    }

    const apiResponse = await fetchFromApi(
      `/tourist/geo_ChatGPT?cityName=${location}`,
      { method: "GET" }
    );
    console.log(apiResponse);
    return await apiResponse.text();
  };

  useEffect(() => {
    const updateArticle = async () => {
      const newArticle = await getArticleFromApi();
      setArticle(newArticle);
    };

    updateArticle();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Short Article</Typography>
      <Paper>
        <MessageRight message={`please tell me some facts about ${location}`} />
        <MessageLeft message={article} />
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          router.push("/tourist/home");
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default TouristArticlePage;
