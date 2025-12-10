import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({allowedRoles}) => {
  return  <Outlet/>
  //outlet is where the child route of privateroute be rendered
 
}

export default PrivateRoute;