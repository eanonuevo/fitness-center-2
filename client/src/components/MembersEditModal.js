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
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const MembersEditModal = ({ rowValues, openEdit, handleCloseEdit }) => {

    const [values, setValues] = useState({
      status: '',
    })

    useEffect(() => {
        setValues(rowValues)
    }, [rowValues])

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleUserStatusSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.patch(`/api/v1/users/updateUserStatus/${rowValues._id}`, values)
        handleCloseEdit()
        toast.success(`${rowValues.firstName} Status Updated!`)
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
        <Box component="form" onSubmit={handleUserStatusSubmit} sx={style}>
          <Typography variant="h5">Update {rowValues.firstName}'s Status</Typography>
          <br />
          <br />
           <Grid container spacing={2}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Member Status</InputLabel>
                <Select
                  id="status"
                  value={values.status}
                  required
                  name="status"
                  label="Member Status"
                  onChange={handleChange}
                >
                    <MenuItem key={1} value={'active'}>active</MenuItem>
                    <MenuItem key={2} value={'inactive'}>inactive</MenuItem>
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

export default MembersEditModal