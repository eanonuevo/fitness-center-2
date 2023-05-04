import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar'

const SharedLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

export default SharedLayout
