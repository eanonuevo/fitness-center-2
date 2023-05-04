import React from 'react'
//import { Link } from 'react-router-dom' // Link tag not used
import img from "../assets/images/not-found.svg";
import { Typography, Button, Grid } from '@mui/material';

const ErrorPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
        <img width={450} src={img} alt="not found" />
        <Typography variant='h4'>Page Not Found.</Typography>
        <br />
        <Button variant="contained" color="secondary" href="/">Back Home</Button>
    </Grid>
  )
}

export default ErrorPage