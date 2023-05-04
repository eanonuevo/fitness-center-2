import React, { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import EquipmentsTable from "../../components/EquipmentsTable";
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  CssBaseline,
  TextField,
} from "@mui/material";

const initialValues = {
  name: '',
  quantity: '', 
}

const Equipments = () => {
  const [values, setValues] = useState(initialValues)
  const [equipments, setEquipments] = useState([])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleAddEquipment = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/v1/equipments', values)
      toast.success(`${values.name} Listed!`)
      // setEquipments([ ...equipments, values ])
      setValues(initialValues)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const getAllEquipments = async () => {
    const data = await axios.get('/api/v1/equipments')
    setEquipments(data.data.equipments)
  }

  useEffect(() => {
    getAllEquipments()
  }, [equipments])

  return (
    <Container>
      <CssBaseline />
      <Box>
        <Typography variant="h4">List an Equipment</Typography>
        <Box component="form" onSubmit={handleAddEquipment} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                value={values.name}
                required
                fullWidth
                onChange={handleChange}
                id="name"
                label="Equipment Name"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type='number'
                value={values.quantity}
                onChange={handleChange}
                id="quantity"
                label="Quantity"
                name="quantity"
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
            List Equipment
          </Button>
        </Box>
      </Box>
      <br />
      <Typography variant="h4">Equipments</Typography>
      <br />
      {/* Displaying all the Equipments */}
      <Box>
        <EquipmentsTable equipments={equipments} />
      </Box>
    </Container>
  );
};

export default Equipments;
