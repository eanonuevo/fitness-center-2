import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Rating, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'; 
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

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

const PendingEditModal = ({ pendingId, plans, openEdit, handleCloseEdit  }) => {

    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      startingDate: '',
      plan: '',
      validity: '',
      name: '',
      price: '',
    })
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser)
    
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleEditPendingSubmit = async (e) => {
      e.preventDefault()
      values.startingDate = moment(values.startingDate).toISOString()
      values.validity = moment(values.startingDate).add(selectedPlan.months, 'M').toISOString()
      try {
        await axios.patch(`/api/v1/membership/pendingUser/${pendingId}`, values)
        handleCloseEdit()
        toast.success('Application Updated!')
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

    const selectedPlan = plans.find((plan) => {
      if (plan._id === values.plan) {
        return true
      }
      return false
    })

    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <Box component="form" onSubmit={handleEditPendingSubmit} sx={style}>
          <Typography variant="h5">Update Pending Form</Typography>
          <br />
          <br />
           <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Plan Membership</InputLabel>
                      <Select
                        id="plan"
                        value={values.plan}
                        required
                        name="plan"
                        label="Plan Membership"
                        onChange={handleChange}
                      >
                        {plans.map((plan) => {
                          const { _id, name } = plan
                          return (
                              <MenuItem key={_id} value={_id}>{name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="date"
                      value={values.startingDate}
                      required
                      onChange={handleChange}
                      id="startingDate"
                      label="Starting Date"
                      name="startingDate"
                      autoComplete="off"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                    
                  {/* Read Only Data */}
                  {selectedPlan && 
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        value={selectedPlan.price}
                        id="price"
                        label="Price"
                        name="planPrice"
                        autoComplete="off"
                        inputProps={{ readOnly: true }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                          fullWidth
                          value={selectedPlan.months}
                          type='number'
                          id="months"
                          label="Months"
                          name="months"
                          autoComplete="off"
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <TextField
                          fullWidth
                          value={selectedPlan.description}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          id="description"
                          label="Plan Description"
                          name="description"
                          autoComplete="off"
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      {/* Hide */}
                      <Grid item xs={12} sm={3} className='hidden'>
                        <TextField
                        fullWidth
                        value={values.firstName = user.firstName}
                        onChange={handleChange}
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3} className='hidden'>
                        <TextField
                        fullWidth
                        value={values.lastName = user.lastName}
                        onChange={handleChange}
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3} className='hidden'>
                        <TextField
                        fullWidth
                        value={values.email = user.email}
                        onChange={handleChange}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3} className='hidden'>
                        <TextField
                        fullWidth
                        value={values.price = selectedPlan.price}
                        onChange={handleChange}
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="off"
                        inputProps={{ readOnly: true }}
                        />
                      </Grid>
                        <Grid item xs={12} sm={3} className='hidden'>
                        <TextField
                        fullWidth
                        value={values.name = selectedPlan.name}
                        onChange={handleChange}
                        id="name"
                        label="Plan Name"
                        name="name"
                        autoComplete="off"
                        inputProps={{ readOnly: true }}
                      />
                      </Grid>
                    </>
                  }
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

export default PendingEditModal