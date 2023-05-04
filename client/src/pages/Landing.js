import React, { useState ,useEffect } from "react";
import axios from "axios";
import img from "../assets/images/gym-hero.svg";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  Box,
  CardActions,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

const Landing = () => {
  const [plans, setPlans] = useState([])

  const getAllPlans = async () => {
    const data = await axios.get('/api/v1/plans')
    setPlans(data.data.plans)
  }

  useEffect(() => {
    getAllPlans()
  }, [plans])

  return (
    <Container maxWidth="xl" mt="2rem">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container height="100vh" sx={{ mb: 5 }}>
        <br />
        <br />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} margin="auto">
            <Typography sx={{ mb: 2 }} component="h1" variant="h2" color="secondary">
              Challenge Your Body
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body1">
              Experience the body of your dreams. Through exercise and training,
              4 Tigers Fitness Gym will assist you in achieving that goal. If you
              only focus on fitness, you will not be able to get in shape. Going
              it alone should never be construed as a sign of strength. With the
              best fitness and holistic help inside the gym, our coach support
              you in a way that no one else can.
            </Typography>
            <Button variant="outlined" size="large" color="secondary" href="/Register">
              Start Now!
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} margin="auto">
            <img className="img" src={img} alt="guy doing excercise" />
          </Grid>
        </Grid>
      </Container>

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Programs Available
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="secondary"
          component="p"
        >
          Choose what program work best for you.
        </Typography>
      </Container>

      {/* Pricing cards */}

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" sx={{ mb: 3 }}>
          {
            plans.map((plan) => {
              const { _id, name, price, months, description } = plan
              return (
                <Grid key={_id} item xs={12} sm={4}>
                  <Card>
                    <CardHeader
                      title={name}
                      titleTypographyProps={{ align: 'center' }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          mb: 2,
                        }}
                      >
                        <Typography component="h2" variant="h3" color="secondary">
                          ₱{price}
                        </Typography>
                      </Box>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                          >
                            {months} month/s
                          </Typography>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                          >
                            {description}
                          </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="outlined" color="secondary"  href="/Register">
                        Apply now!
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
      <br />
      <br />
    </Container>
  );
};

export default Landing;
