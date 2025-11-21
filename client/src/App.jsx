import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Navbar from './components/Navbar_component.jsx'
import Home from './components/Home.jsx';
import ParkingLots from './components/ParkingLots.jsx';
import Reservations from './components/Reservations.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login_component.jsx';

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lots" element={<ParkingLots />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
