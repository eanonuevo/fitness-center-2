import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  Typography,
  Container,
  Box,
  CssBaseline,
  Stack,
  Switch,
} from "@mui/material";
import PendingTable from '../../components/PendingTable';
import ApprovedTable from '../../components/ApprovedTable';

const Memberships = () => {
    const [checked, setChecked] = useState(false);
    const [memberhshipStatus, setMembershipStatus] = useState({})
    const [pending, setPending] = useState([])
    const [approved, setApproved] = useState([])

    const handleChange = () => {
        setChecked(!checked)
    };

    const getPendingMemberships = async () => {
        const {data} = await axios.get('/api/v1/membership/pending')
        setPending(data.memberships)
    }
    
    const getApprovedMemberships = async () => {
        const {data} = await axios.get('/api/v1/membership/approved')
        setApproved(data.memberships)
    }

    const getMembershipStatus = async () => {
        const { data } = await axios.get('/api/v1/membership/stats/status')
        setMembershipStatus(data.defaultStats)
    }

    useEffect(() => {
        getPendingMemberships()
    }, [pending])

    useEffect(() => {
        getApprovedMemberships()
    }, [approved])

    useEffect(() =>  {
        getMembershipStatus()
    }, [memberhshipStatus])

    return (
        <Container>
            <CssBaseline />
            <Typography variant="h6">Today is: {moment().format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            <br />
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Pending</Typography>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    color="secondary"
                />
                <Typography>Approved</Typography>
            </Stack>
            <br />
            {
                !checked ?
                // Display Pending
                <>
                    <Box>
                        <Typography variant="h4">Pending Memberships</Typography>
                    </Box>
                    <br />
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h5">
                            {memberhshipStatus.pending}
                        </Typography>
                         <Typography variant="h5" color="orange">
                            Pending
                        </Typography>
                    </Stack>
                    <br />
                    <Box>
                        <PendingTable pending={pending} />
                    </Box>
                </>
                :
                // Display Approved
                <>
                    <Box>
                        <Typography variant="h4">Approved Memberships</Typography>
                    </Box>
                    <br />
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h5">
                            {memberhshipStatus.approved}
                        </Typography>
                         <Typography variant="h5" color="green">
                            Approved
                        </Typography>
                    </Stack>
                    <br />
                    <Box>
                        <ApprovedTable approved={approved} />
                    </Box>
                </>
            }
        </Container>
    )
    }

export default Memberships