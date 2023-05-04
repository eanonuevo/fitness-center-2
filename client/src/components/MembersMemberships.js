import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import UserMembershipsTable from './UserMembershipsTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, md: 1000, lg: 1250 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const MembersMemberships = ({ rowValues, openView, handleCloseView }) => {
    const [memberships, setMemberships] = useState([])

    const getUserMemberships = async () => {
        const {data} = await axios.get(`/api/v1/membership/${rowValues._id}`)
        setMemberships(data.memberships)
    }

    useEffect(() => {
        getUserMemberships()
    }, [openView, memberships])

    return (
      <Modal
        open={openView}
        onClose={handleCloseView}
      >
        <Box component="form" sx={style}>
          <Typography variant="h5">{rowValues.firstName}'s Memberships</Typography>
          <br />
            <UserMembershipsTable memberships={memberships} />
          <br />
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              color='error'
              type='button'
              onClick={handleCloseView}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    )
}

export default MembersMemberships