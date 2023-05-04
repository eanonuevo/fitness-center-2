import BorderColorIcon from '@mui/icons-material/BorderColor';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const userLinks = [
    {
        id: 1,
        text: 'Membership',
        path: '',
        icon: <BorderColorIcon />
    },
    {
        id: 2,
        text: 'Review',
        path: 'reviews',
        icon: <ReviewsIcon />
    },
    {
        id: 3,
        text: 'Profile',
        path: 'profile',
        icon: <AccountCircleIcon />
    },
]

export default userLinks