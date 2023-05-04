import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SharedLayout, Landing, Register, Login, About, Reviews, Forgot, Reset, ErrorPage }  from './pages'
import { SharedAdminLayout, Stats, Members, Memberships, Plans, Equipments, AdminProfile, AdminProtected } from './pages/admin'
import { SharedUserLayout, UserReview, UserProfile, UserMembership, UserProtected } from './pages/user'
import {createTheme, ThemeProvider} from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#040404"
    },
    secondary: {
      main: "#e17b2a"
    }
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Landing />} />
            <Route path='register'          element={<Register />} />


            
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />} />
            <Route path='reviews' element={<Reviews />} />
            <Route path='forgot' element={<Forgot />} />
            <Route path='users/reset-password' element={<Reset />} />
          </Route>
          {/* Admin Routes */}
          <Route path='admin' element={<AdminProtected><SharedAdminLayout /></AdminProtected>}>
            <Route index element={<Stats />} />
            <Route path='members' element={<Members />} />
            <Route path='memberships' element={<Memberships />} />
            <Route path='plans' element={<Plans />} />
            <Route path='equipments' element={<Equipments />} />
            <Route path='profile' element={<AdminProfile />} />
          </Route>
          {/* User Routes */}
          <Route path='user' element={<UserProtected><SharedUserLayout /></UserProtected>}>
            <Route index element={<UserMembership />} />
            <Route path='reviews' element={<UserReview />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
          {/* Error Page */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={3000}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
