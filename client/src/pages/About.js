import React from "react";
import { Container, Typography, Grid, Stack, CssBaseline } from "@mui/material";
import tiger from '../assets/images/gym-facebook.jpg'
import one from '../assets/images/1.jpg'
import two from '../assets/images/2.jpg'
import three from '../assets/images/3.jpg'
import four from '../assets/images/4.jpg'

const About = () => {
  return (
    <Container>
      <CssBaseline />
      <Container maxWidth="md">
        <br />
        <br />
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
        >
          About Us
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <img className="img" width={350} src={tiger} alt="4 tigers official logo" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" className="heading">
                4 Tigers Fitness Gym - Wellness Hub
              </Typography>
              <br />
              <Typography variant="body1" className="info">
                The best fitness center located at 4325 Tiaong, Quezon Province, Philippines. That offers variety of programs mainly: Weights Training, Circuit Training, Boxing Training and Muay Thai for Kids and Adults Training.
              </Typography>
              <br />
              <Typography variant="body1" className="info">
                Contact Details:
              </Typography>
              <Typography variant="body1" className="info">
                Phone Number: 0915 447 0392
              </Typography>
              <Typography variant="body1" className="info">
                Facebook Page: <a href="https://www.facebook.com/4tigersmuaythai/">4 Tigers Fitness Gym</a>
              </Typography>
            </Grid>
          </Grid>
      </Container>
      <Container maxWidth="md">
        <br />
        <br />
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
        >
          Gallery
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <img src={one} alt="one" className="img" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={two} alt="two" className="img"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={three} alt="three" className="img"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={four} alt="four" className="img" />
            </Grid>
          </Grid>
      </Container>
    </Container>
  );
};

export default About;
