import Link from "next/link";
import { Button, Container, Grid, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to Our Website
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/tourist/login" passHref>
            <Button variant="contained" color="primary">
              Tourist Login
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/business/login" passHref>
            <Button variant="contained" color="primary">
              Business Login
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/advertiser/login" passHref>
            <Button variant="contained" color="primary">
              Advertiser Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
