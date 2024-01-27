import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import { useAuthContext } from './hooks/useAuthContext'
import GPACalculator from './pages/GPACalculator'
import ModulesListPage from './pages/ModulesListPage'
import GpaPredictor from './pages/GpaPredictor'

function App() {

  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path="/" element={ user ? <Home/>: <Navigate to="/login"/>} />
          </Routes>
          <Routes>
            <Route path="/login" element={!user ? <Login/>: <Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path="/signup" element={!user ? <Signup/>: <Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path="/calculator" element={ user ? <GPACalculator/>: <Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path="/module-list" element={ user ? <ModulesListPage/>: <Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path="/gpa-predictor" element={ user ? <GpaPredictor/>: <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
