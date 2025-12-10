import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Dashboard from "./pages/admin/Dashboard"
import ManageTask from './pages/admin/ManageTask'
import ManageUsers from './pages/admin/ManageUsers'
import CreateTask from './pages/admin/CreateTask'
import PrivateRoute from './routes/PrivateRoute'
import UserDashboard from './pages/user/UserDashboard'
import MyTask from './pages/user/MyTask'
import TaskDetail from './pages/user/TaskDetail'

const App= ()=> {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-up'  element={<SignUp/>}/> 

        {/* Adin route */}
        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
        <Route path='admin/dashboard' element={<Dashboard/>} />
        <Route path='admin/taks' element={<ManageTask/>} />
        <Route path='admin/users' element={<ManageUsers/>} />
        <Route path='admin/create-task' element={<CreateTask/>} />
        </Route>

        {/* user routes */}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path='user/dashboard' element={<UserDashboard/>}/>
        <Route path='user/task' element={<MyTask/>}/>
        <Route path='user/task-details/:id' element={<TaskDetail/>}/>
        

        </Route>

      </Routes>
      </BrowserRouter>
    </div>
    
    
  )
}

export default App;
