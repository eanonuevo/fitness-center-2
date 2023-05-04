import React, { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  CssBaseline,
  TextField,
  InputAdornment,
} from "@mui/material";
import PlansTable from '../../components/PlansTable'

const initialValues = {
  name: '',
  price: '',
  months: '',
  description: '',
}

const Plans = () => {
  const [values, setValues] = useState(initialValues)
  const [plans, setPlans] = useState([])

  const handleChange = (e) => {
     setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleAddPlan = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/v1/plans', values)
      toast.success('Plan created!')
      setValues(initialValues)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  // get all plans from the database
  const getAllPlans = async () => {
      const data = await axios.get('/api/v1/plans')
      setPlans(data.data.plans)
  }
  useEffect(() => {
    getAllPlans()
  }, [plans])

  return (
    <Container>
      <CssBaseline />
      <Box>
        <Typography variant="h4">Add a Plan</Typography>
        <Box component="form" onSubmit={handleAddPlan} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                id="name"
                label="Plan Name"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
                type="number"
                value={values.price}
                onChange={handleChange}
                id="price"
                label="price"
                name="price"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                value={values.months}
                onChange={handleChange}
                id="months"
                label="Months"
                name="months"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value ={values.description}
                onChange={handleChange}
                multiline
                rows={4}
                id="description"
                label="Description"
                name="description"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Plan
          </Button>
        </Box>
        <br />
        <Typography variant="h4">Plans</Typography>
        <br />
        {/* Displaying all the Plans */}
        <Box>
          <PlansTable plans={plans}/>
        </Box>
      </Box>
    </Container>
  );
};

export default Plans;
