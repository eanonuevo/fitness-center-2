import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Typography,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";
import MembersTable from '../../components/MembersTable';


const Members = () => {
  const [members, setMembers] = useState([])

  const getAllMembers = async () => {
    const data = await axios.get('/api/v1/users')
    setMembers(data.data.users)
  }

  useEffect(() => {
    getAllMembers()
  }, [members])

  return (
    <Container>
      <CssBaseline />
      <Box>
        <Typography variant="h4">Members</Typography>
        <br />
        <MembersTable members={members} />
      </Box>
    </Container>
  )
}

export default Members