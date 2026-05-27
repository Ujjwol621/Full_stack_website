import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
        </Routes>
    </div>
  )
}
export default AppRoutes;
