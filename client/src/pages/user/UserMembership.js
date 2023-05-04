import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  CssBaseline,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import MembershipTable from "../../components/MembershipTable";
import PendingDeleteModal from "../../components/PendingDeleteModal";
import PendingEditModal from "../../components/PendingEditModal";

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  startingDate: '',
  plan: '',
  validity: '',
  name: '',
  price: '',
}

const UserMembership = () => {
  const getUser = localStorage.getItem('user')
  const user = JSON.parse(getUser)
  const [memberships, setMemberships] = useState([])
  const [values, setValues] = useState(initialValues)
  const [plans, setPlans] = useState([])
  const [pending, setPending] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenDelete = () => {
        setOpenDelete(true)
  }
  const handleCloseDelete = () => setOpenDelete(false)

  const handleOpenEdit = () => {
        setOpenEdit(true)
  }
  const handleCloseEdit = () => setOpenEdit(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleApplyMembership = async (e) => {
    e.preventDefault()
    values.startingDate = moment(values.startingDate).toISOString(true)
    values.validity = moment(values.startingDate).add(selectedPlan.months, 'M').toISOString(true)
    console.log(values.startingDate, values.validity)
    try {
      await axios.post('/api/v1/membership', values)
      toast.success('Membership applied')
      setValues(initialValues)
      window.location.reload()
    } catch (error) {
       toast.error(error.response.data.msg)
    }
  }

  const getAllPlans = async () => {
    const data = await axios.get('/api/v1/plans')
    setPlans(data.data.plans)
  }

  const getAllUsermemberships = async () => {
    const {data} = await axios.get(`/api/v1/membership/${user.userId}`)
    setMemberships(data.memberships)
  }

  const getPendingMembership = async () => {
    const {data} = await axios.get(`/api/v1/membership/pendingUser/${user.userId}`)
    setPending(data.pending)
  }

  const selectedPlan = plans.find((plan) => {
    if (plan._id === values.plan) {
      return true
    }
    return false
  })

  useEffect(() => {
    getAllPlans()
  }, [])

  useEffect(() => {
    getPendingMembership()
  }, [openEdit, openDelete])

  useEffect(() => {
    getAllUsermemberships()
  }, [memberships])

  return (
    <Container>
        <CssBaseline />
      <Box>
        {
          !pending && 
          <>
              <Typography variant="h4">Membership Form</Typography>
              <Box component="form" onSubmit={handleApplyMembership} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={3}>
                        <TextField
                        fullWidth
                        value={selectedPlan.price}
                        id="price"
                        label="Price"
                        name="planPrice"
                        autoComplete="off"
                        inputProps={{ readOnly: true }}
                        color="secondary"
                      />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                          <TextField
                          fullWidth
                          value={selectedPlan.months}
                          type='number'
                          id="months"
                          label="Months"
                          name="months"
                          autoComplete="off"
                          inputProps={{ readOnly: true }}
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
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
                          color="secondary"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Apply Membership
                </Button>
              </Box>
          </>
        }

        {
          pending &&
          <>
            <Typography variant="h4">Pending Application</Typography>
            <br />
            <Card sx={{ maxWidth: 500, minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" color="secondary"  >
                  {pending.name}
                </Typography>
                <br />
                <Typography variant="body1" gutterBottom>
                  Status: {pending.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ₱ {pending.price}
                </Typography>
                <Typography variant="body1" gutterBottom> 
                  Starting Date: {moment(pending.startingDate).format('MMMM Do YYYY')}
                </Typography>
                <Typography variant="body1" gutterBottom> 
                  Valid Until: {moment(pending.validity).format('MMMM Do YYYY')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button>
                  <EditIcon color="secondary" onClick={() => handleOpenEdit()}/>
                </Button>
                <Button>
                  <ClearIcon color="secondary" onClick={() => handleOpenDelete()}/>
                </Button>
              </CardActions>
            </Card>
            <PendingDeleteModal pendingId={pending._id} openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
            <PendingEditModal pendingId={pending._id} plans={plans} openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
          </>
        }
        
        <br />
        <br />
        <Typography variant="h4">Membership History</Typography>
        <br />
        {/* Displaying all user's memberships */}
        <Box>
          <MembershipTable memberships={memberships} />
        </Box>
      </Box>
    </Container>
  )
}

export default UserMembership