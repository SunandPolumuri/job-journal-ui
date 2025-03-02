import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import HomePage from './components/HomePage'
import ProtectedRoutes from './components/utils/ProtectedRoutes'

function App() {

  return (
    <Router>
      <div className='w-screen h-screen'>
        <nav className="sticky top-0 left-0 w-full h-[7vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-2xs">
          <NavBar className="h-24"/>
        </nav>
        <main className="h-[93vh] p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Login/>}/>

              {/* Protected Routes */}
              <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<HomePage/>} exact/>
              </Route>
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
