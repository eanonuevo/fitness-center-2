import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Rating,
  Box,
  Typography,
  Container,
  CssBaseline,
  TextField,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ReviewDeleteModal from "../../components/ReviewDeleteModal";
import ReviewEditModal from "../../components/ReviewEditModal";

const initialValues = {
  rating: 5,
  comment: ''
}

const UserReview = () => {
  const getUser = localStorage.getItem('user')
  const user = JSON.parse(getUser)
  const [values, setValues] = React.useState(initialValues);
  const [review, setReview] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenDelete = () => {
        setOpenDelete(true)
  }
  const handleCloseDelete = () => setOpenDelete(false)

  const handleOpenEdit = () => {
        setOpenEdit(true)
  }
  const handleCloseEdit = () => setOpenEdit(false)

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/v1/reviews', values)
      toast.success('Review created!')
      setValues(initialValues)
      getSingleReview()
    } catch (error) {
      toast.error(error.response.data.msg)
      setValues(initialValues)
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const getSingleReview = async () => {
    const {data} = await axios.get(`/api/v1/reviews/${user.userId}`)
    setReview(data.review)
  }

  useEffect(() => {
    getSingleReview()
  }, [openEdit, openDelete])

  return (
    <Container>
      <CssBaseline />
      <Box component="form">
      {
        !review &&
        <Stack spacing={1}>
        <Typography variant="h4">
          Leave a Review
        </Typography>
        <br />
        <Rating
          size="large"
          type="number"
          required
          value={Number(values.rating)}
          name="rating"
          onChange={handleChange}
        />
        <br />
        <TextField 
          id="comment"
          name="comment"
          required
          value={values.comment}
          onChange={handleChange}
          label="Write a Comment" 
          multiline rows={4}
        />
        <br />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleReviewSubmit}
        >
          Publish
        </Button>
      </Stack>
      }
      
      <br />
      <br />
      <Typography variant="h4">
          Your Review
      </Typography>
      {
        review ? 
        <>
          <br />
          <br />
          <Card sx={{ maxWidth: 500, minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {moment(review.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
              <Stack direction="row"> 
                <Rating
                  size="large"
                  type="number"
                  value={review.rating}
                  name="rating"
                  readOnly
                />
                <Typography variant="h6" color='gray'>
                   ({review.rating}/5)
                </Typography>
              </Stack>
              <br />
              <Typography variant="h6">
                {review.comment}
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                <EditIcon color="secondary" onClick={() => handleOpenEdit()} />
              </Button>
              <Button>
                <DeleteIcon color="secondary" onClick={() => handleOpenDelete()} />
              </Button>
            </CardActions>
          </Card>
          <ReviewEditModal review={review} openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
          <ReviewDeleteModal reviewId={review._id} openDelete={openDelete} handleCloseDelete={handleCloseDelete}/>
        </>
        :
        <>
          <br />
          <br />
          <Typography variant="h5" align="center">You don't have review yet...</Typography>
        </>
      }
    </Box>
    </Container>
  );
};

export default UserReview;
