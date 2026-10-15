import {Routes, Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import {RandomRoute } from './components/RandomRoute'
import DashboardLayout from './layouts/DashBoardLayout'
import CreateStudent from './pages/CreateStudent'
import CreateTeacher from './pages/CreateTeacher'
import CreateEnrollments from './pages/CreateEnrollments'
import CreateCourse from './pages/CreateCourse'
function App() {


  return (
    
      <Routes>

        <Route path="/" element={

          <PublicRoute>
            <Login />
          </PublicRoute>
          
          } />
        
        <Route
        path="/admin" 
        element={
          <ProtectedRoute requiredRole={"admin"}>
            <DashboardLayout/>
          </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard/>}/>
          <Route path="students/create" element={<CreateStudent />}/>
          <Route path='teachers/create' element={<CreateTeacher/>}/>
          <Route path='enrollments/create' element={<CreateEnrollments/>}/>
          <Route path='courses/create' element={<CreateCourse/>}/>
          </Route>
        <Route path="/teacher" 
        element={
          <ProtectedRoute requiredRole={"teacher"}>
            <TeacherDashboard/>
          </ProtectedRoute>
        
        }/>


        <Route path="/student" 
        element={
          <ProtectedRoute requiredRole={"student"}>
            <StudentDashboard/>
          </ProtectedRoute>
        
        }/>
        <Route path='*'
        element={
          <RandomRoute>
            
          </RandomRoute>
        }/>
        
        
      </Routes>
  
  )
}

export default App
