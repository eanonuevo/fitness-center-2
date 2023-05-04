import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment';
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

const ExpiredModal = ({ rowValues, openExpire, handleCloseExpire }) => {

    const handleSubmitExpire = async (e) => {
        try {
            await axios.patch(`/api/v1/membership/email/expired/${rowValues._id}`, { status: 'expired' })
            handleCloseExpire()
            toast.success('Success')
        } catch (error) {
            // toast.error(error.response.data.msg)
            handleCloseExpire()
            toast.success('Expired Membership! Email sent')
        }
    }

    return (
        <Modal
            open={openExpire}
            onClose={handleCloseExpire}
        >
            <Box sx={style} >
                <Typography variant="h5">Expiring {rowValues.firstName}'s Membership</Typography>
                <br />
                <Typography variant="p">
                    Are you sure this membership is beyond its validity date: {moment(rowValues.validity).format('MMMM D YYYY')} and can be considered as expired?
                </Typography>
                <br />
                <br />
                 <Stack spacing={2} direction="row">
                    <Button
                    variant="outlined"
                    color='error'
                    type='button'
                    onClick={handleCloseExpire}
                    >
                    Cancel
                    </Button>
                    <Button
                    variant="contained"
                    type='submit'
                    onClick={handleSubmitExpire}
                    >
                    Expire
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ExpiredModal