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

const RejectedModal = ({ rowValues, openReject, handleCloseReject }) => {

    const handleSubmitReject = async (e) => {
        try {
            await axios.patch(`/api/v1/membership/email/rejected/${rowValues._id}`, { status: 'rejected' })
            handleCloseReject()
            toast.success('Rejected Application')
        } catch (error) {
            // toast.error(error.response.data.msg)
            handleCloseReject()
            toast.success('Rejected Membership! Email sent')
        }
    }

    return (
        <Modal
            open={openReject}
            onClose={handleCloseReject}
        >
            <Box sx={style} >
                <Typography variant="h5">Rejecting {rowValues.firstName}'s Membership</Typography>
                <br />
                <Typography variant="p">
                    Are you sure you want to reject this membership application?
                </Typography>
                <br />
                <br />
                 <Stack spacing={2} direction="row">
                    <Button
                    variant="outlined"
                    color='error'
                    type='button'
                    onClick={handleCloseReject}
                    >
                    Cancel
                    </Button>
                    <Button
                    variant="contained"
                    type='submit'
                    onClick={handleSubmitReject}
                    >
                    Reject
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default RejectedModal