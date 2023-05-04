import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupIcon from '@mui/icons-material/Group';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const adminLinks = [
    {
        id: 1,
        text: 'Stats',
        path: '',
        icon: <QueryStatsIcon />
    },
    {
        id: 2,
        text: 'Members',
        path: 'members',
        icon: <GroupIcon />
    },
    {
        id: 3,
        text: 'Memberships',
        path: 'memberships',
        icon: <PendingActionsIcon />
    },
    {
        id: 4,
        text: 'Plans',
        path: 'plans',
        icon: <HistoryEduIcon />
    },
    {
        id: 5,
        text: 'Equipments',
        path: 'equipments',
        icon: <FitnessCenterIcon />
    },
    {
        id: 6,
        text: 'Profile',
        path: 'profile',
        icon: <AccountCircleIcon />
    },
]

export default adminLinks
