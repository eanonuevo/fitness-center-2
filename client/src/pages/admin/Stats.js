import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Typography,
  Grid,
  Container,
  Box,
  CssBaseline,
  Card,
  CardContent,
} from "@mui/material";

const Stats = () => {
  const [memberhshipStatus, setMembershipStatus] = useState({})
  const [income, setIncome] = useState({})
  const [userStatus, setUserStatus] = useState({})
  const [avg, setAvg] = useState({})
  const [reviews, setReviews] = useState({})
  const [plans, setPlans] = useState({})
  const [list, setList] = useState({})

  const getMembershipStatus = async () => {
    const { data } = await axios.get('/api/v1/membership/stats/status')
    setMembershipStatus(data.defaultStats)
  }

  const getTotalIncome = async () => {
    const { data } = await axios.get('/api/v1/membership/stats/income')
    setIncome(data.totalIncome)
  }

  const getUserStatus = async () => {
    const { data } = await axios.get('/api/v1/users/stats/status')
    setUserStatus(data.defaultStats)
  }

  const getAvgReviews = async () => {
    const { data } = await axios.get('/api/v1/reviews/stats/average')
    setAvg(data.averageRating)
  }

  const getTotalReviews = async () => {
    const { data } = await axios.get('/api/v1/reviews/stats/total')
    setReviews(data)
  }

  const getTotalPlans = async () => {
    const { data } = await axios.get('/api/v1/plans/stats/total')
    setPlans(data)
  }

  const getTotalEquipments = async () => {
    const { data } = await axios.get('/api/v1/equipments/stats/total')
    setList(data)
  }

  useEffect(() =>  {
    getMembershipStatus()
  }, [memberhshipStatus])

  useEffect(() =>  {
    getTotalIncome()
  }, [income])

  useEffect(() =>  {
    getUserStatus()
  }, [userStatus])

  useEffect(() =>  {
    getAvgReviews()
  }, [avg])

  useEffect(() =>  {
    getTotalReviews()
  }, [reviews])

  useEffect(() =>  {
    getTotalPlans()
  }, [plans])

  useEffect(() =>  {
    getTotalEquipments()
  }, [list])

  return (
    <Container>
      <CssBaseline />
      <Box>
        
        <Typography variant="h4">Stats</Typography>
        <br />
        {/* Membership Stats */}
        <Grid container spacing={2} >
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                 <Typography variant="h4">
                  {memberhshipStatus.pending}
                </Typography>
                <br />
                <Typography variant="h6" color="orange" >
                  Pending 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {memberhshipStatus.approved}
                </Typography>
                <br />
                <Typography variant="h6" color="green">
                  Approved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {memberhshipStatus.rejected}
                </Typography>
                <br />
                <Typography variant="h6" color="red">
                 Rejected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {memberhshipStatus.expired}
                </Typography>
                <br />
                <Typography variant="h6" color="darkgray">
                  Expired
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Total Income */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  ₱ {income.approved}
                </Typography>
                <br />
                <Typography variant="h6">
                  Total Income
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* User Status */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {userStatus.active}
                </Typography>
                <br />
                <Typography variant="h6">
                  Active Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {userStatus.inactive}
                </Typography>
                <br />
                <Typography variant="h6">
                  Inactive Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Reviews */}
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {avg.rating ? avg.rating : 0 }
                </Typography>
                <br />
                <Typography variant="h6">
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {reviews.stats}
                </Typography>
                <br />
                <Typography variant="h6">
                  Total Reviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Plan */}
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {plans.stats}
                </Typography>
                <br />
                <Typography variant="h6">
                  Total Plan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Equipment */}
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {list.stats}
                </Typography>
                <br />
                <Typography variant="h6">
                  Total Equipment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Stats