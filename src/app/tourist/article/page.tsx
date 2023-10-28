"use client";

import { MessageLeft } from "@/components/Message";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TouristArticlePage = () => {
  const [article, setArticle] = useState<string>("loading...");

  const getArticleFromApi = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "article from api long long long long long long long long";
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
        <MessageLeft message={article} />
      </Paper>
    </Container>
  );
};

export default TouristArticlePage;
