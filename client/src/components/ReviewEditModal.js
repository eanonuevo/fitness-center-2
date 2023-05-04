import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Rating, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
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

const ReviewEditModal = ({ review, openEdit, handleCloseEdit  }) => {

    const [values, setValues] = useState({
        rating: review.rating,
        comment: review.comment,
    })
    
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleEditReviewSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.patch(`/api/v1/reviews/${review._id}`, values)
        handleCloseEdit()
        toast.success('Review Updated!')
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <Box component="form" onSubmit={handleEditReviewSubmit} sx={style}>
          <Typography variant="h5">Update your Review</Typography>
          <br />
          <br />
           <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Rating
                name='rating'
                value={Number(values.rating)}
                size='large'
                onChange={handleChange}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField 
                id="comment"
                name="comment"
                required
                fullWidth
                value={values.comment}
                onChange={handleChange}
                label="Write a Comment" 
                multiline rows={4}
              />
            </Grid>   
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

export default ReviewEditModal