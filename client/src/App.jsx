import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.scss'
import './styles/App.scss'
import './utils/ionicons.js'
import { useTheme } from './hooks';
import Navbar from './components/Navbar_component.jsx'
import Home from './pages/Home.jsx';
import LotsPage from './pages/LotsPage.jsx';
import Reservations from './pages/Reservations.jsx';
import UserProfile from './pages/UserProfile_component.jsx';
import Login from './pages/Login_component.jsx';

function App() {
  // Initialize theme
  useTheme();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lots" element={<LotsPage />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
