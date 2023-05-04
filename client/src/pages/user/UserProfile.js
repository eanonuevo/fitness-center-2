import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Typography,
  Container,
  CssBaseline,
  TextField,
  Box,
  Button,
  Grid,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const initialValues = {
  oldPassword: '',
  newPassword: '',
}

const UserProfile = () => {
    const getUser = localStorage.getItem('user')
  const user = JSON.parse(getUser)
  const [info, setInfo] = useState()
  const [passwords, setPasswords] = useState(initialValues)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1)
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2)
  };

  const handleChange = (e) => {
     setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
     setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const changePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.patch('/api/v1/users/updateUserPassword', passwords)
      toast.success(data.msg)
         setPasswords(initialValues)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const getUserInfo = async () => {
    const data = await axios.get(`/api/v1/users/${user.userId}`)
    setInfo(data.data.user)
  }

  const updateUserInfoSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`/api/v1/users/updateUser/${user.userId}`, info)
      toast.success('Profile Updated!')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Member Profile
        </Typography>
        {
          info && 
          <Box component="form" onSubmit={updateUserInfoSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                autoComplete="off"
                name="firstName"
                value={info.firstName}
                onChange={handleChange}
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                autoComplete="off"
                name="lastName"
                value={info.lastName}
                onChange={handleChange}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                autoComplete="off"
                name="email"
                value={info.email}
                onChange={handleChange}
                label="Email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
        }
        
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Change Password
        </Typography>
        <Box component="form" onSubmit={changePasswordSubmit}  sx={{ mt: 3 }}>
          <TextField
            fullWidth
            autoComplete="off"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            label="Old Password"
            type={showPassword1 ? 'text' : 'password'}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                  >
                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            autoComplete="off"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            label="New Password"
            type={showPassword2 ? 'text' : 'password'}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                  >
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            autoComplete="off"
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
