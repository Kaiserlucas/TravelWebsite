import './App.css';
import Login from './components/pages/Login/Login';
import Karte from './components/pages/Karte/Karte';
import Reisen from './components/pages/Reisen/reisen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/karte" element={<Karte />} />
          <Route path="/reisen" element={<Reisen />} />
          <Route path="/" element={<Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
