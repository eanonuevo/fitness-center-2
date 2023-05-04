import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Container,
  Typography,
  Grid,
  CardContent,
  Card,
  Stack,
  Rating,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [avg, setAvg] = useState({})

  const getAllReviews = async () => {
    const data = await axios.get('/api/v1/reviews')
    setReviews(data.data.reviews)
  }

  const getAvgReviews = async () => {
    const { data } = await axios.get('/api/v1/reviews/stats/average')
    setAvg(data.averageRating)
  }

  useEffect(() => {
    getAllReviews()
  }, [reviews])

  useEffect(() =>  {
    getAvgReviews()
  }, [avg])

  return (
    <Container>
      <CssBaseline />
      <Container maxWidth="sm">
        <br />
        <br />
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
        >
          Reviews
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="secondary">
                    {avg.rating ? avg.rating : 0 } out of 5
                  </Typography>
                  <br />
                  <Typography variant="h6">
                    Average Rating
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
        </Grid>
      <Container sx={{ py: 5 }} maxWidth="md">
          <Grid container spacing={0.5}>
          {
            reviews.map((review) => {
              const { _id, rating, comment, updatedAt } = review
              return (
                <Grid key={_id} item xs={12} sm={12}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </Typography>
                      <Stack direction="row"> 
                        <Rating
                          type="number"
                          value={rating}
                          name="rating"
                          readOnly
                        />
                        <Typography variant="p" color='gray'>
                          ({rating}/5)
                        </Typography>
                      </Stack>
                      <br />
                      <Typography variant="p">
                        {comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </Container>
  );
};

export default Reviews;
