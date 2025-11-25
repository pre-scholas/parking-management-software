import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css'
import './App.css'
import Navbar from './components/Navbar_component.jsx'
import Home from './components/Home.jsx';
import LotsPage from './components/LotsPage.jsx';
import Reservations from './components/Reservations.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login_component.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lots" element={<LotsPage />} />
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
