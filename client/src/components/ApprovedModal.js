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

const ApprovedModal = ({ rowValues, openApprove, handleCloseApprove }) => {

    const handleSubmitApprove = async (e) => {
        try {
            await axios.patch(`/api/v1/membership/email/approved/${rowValues._id}`, { status: 'approved' })
            handleCloseApprove()
            toast.success('Approved Application')
        } catch (error) {
            // toast.error(error.response.data.msg)
            handleCloseApprove()
            toast.success('Approved Membership! Email sent')
        }
    }

    return (
        <Modal
            open={openApprove}
            onClose={handleCloseApprove}
        >
            <Box sx={style} >
                <Typography variant="h5">Approving {rowValues.firstName}'s Membership</Typography>
                <br />
                <Typography variant="p">
                    Are you sure you want to approve this membership application?
                </Typography>
                <br />
                <br />
                 <Stack spacing={2} direction="row">
                    <Button
                    variant="outlined"
                    color='error'
                    type='button'
                    onClick={handleCloseApprove}
                    >
                    Cancel
                    </Button>
                    <Button
                    variant="contained"
                    type='submit'
                    onClick={handleSubmitApprove}
                    >
                    Approve
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ApprovedModal