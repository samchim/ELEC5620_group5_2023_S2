import Link from "next/link";
import { Button, Container, Grid, Typography } from "@mui/material";

const TouristHomePage = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome Tourist
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/tourist/location" passHref>
            <Button variant="contained" color="primary">
              Update Location
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/tourist/article" passHref>
            <Button variant="contained" color="primary">
              Short article
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/tourist/conversation" passHref>
            <Button variant="contained" color="primary">
              Start Conversation
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TouristHomePage;
