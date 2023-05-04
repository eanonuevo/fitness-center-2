import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const MembershipsEditModal = ({ membershipValues, openEdit, handleCloseEdit }) => {

    const [values, setValues] = useState({
        status: '',
        user: membershipValues.user,
        plan: membershipValues.plan,
    })

    useEffect(() => {
        setValues(membershipValues)
    }, [membershipValues])

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleMembershipEditSubmit = async (e) => {
      e.preventDefault()
      // console.log(values)
      try {
        await axios.patch(`/api/v1/membership/${membershipValues._id}`, values)
        handleCloseEdit()
        toast.success(`Membership Status Updated!`)
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
        <Box component="form" onSubmit={handleMembershipEditSubmit} sx={style}>
          <Typography variant="h5">Update Membership Status</Typography>
          <br />
          <br />
           <Grid container spacing={2}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Membership Status</InputLabel>
                <Select
                  id="status"
                  value={values.status}
                  required
                  name="status"
                  label="Membership Status"
                  onChange={handleChange}
                >
                    <MenuItem key={1} value={'pending'}>pending</MenuItem>
                    <MenuItem key={2} value={'approved'}>approved</MenuItem>
                    <MenuItem key={3} value={'rejected'}>rejected</MenuItem>
                    <MenuItem key={4} value={'expired'}>expired</MenuItem>
                </Select>
              </FormControl>
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

export default MembershipsEditModal