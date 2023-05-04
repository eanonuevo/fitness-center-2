import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField"
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const PlansEditModal = ({ rowValues, openEdit, handleCloseEdit }) => {

    const [values, setValues] = useState({
      name: '',
      price: '',
      months: '',
      description: '',
    })

    useEffect(() => {
        setValues(rowValues)
    }, [rowValues])

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleUpdatePlanSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.patch(`/api/v1/plans/${rowValues._id}`, values)
        handleCloseEdit()
        toast.success(`Plan Updated!`)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.msg)
      }
    }

    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <Box component="form" onSubmit={handleUpdatePlanSubmit} sx={style}>
          <Typography variant="h5">Update {rowValues.name}</Typography>
          <br />
           <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={12}>
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
          <br />
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              color='error'
              type='button'
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type='submit'
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>
    )
}

export default PlansEditModal