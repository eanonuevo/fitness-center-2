import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

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

const MembersDeleteModal = ({ rowValues, openDelete, handleCloseDelete }) => {

    const handleSubmitDelete = async (e) => {
        try {
            await axios.delete(`/api/v1/users/${rowValues._id}`)
            handleCloseDelete()
            toast.success('User Deleted')
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <Modal
            open={openDelete}
            onClose={handleCloseDelete}
        >
            <Box sx={style} >
                <Typography variant="h5">Delete {rowValues.firstName} {rowValues.lastName}</Typography>
                <br />
                <Typography variant="p">
                    Warning: This action cannot be undone. Are you sure you want to Delete?
                </Typography>
                <br />
                <br />
                 <Stack spacing={2} direction="row">
                    <Button
                    variant="outlined"
                    color='error'
                    type='button'
                    onClick={handleCloseDelete}
                    >
                    Cancel
                    </Button>
                    <Button
                    variant="contained"
                    color='error'
                    type='submit'
                    onClick={handleSubmitDelete}
                    >
                    Delete
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default MembersDeleteModal