import './App.css';
import Login from './components/pages/Login/Login';
import Karte from './components/pages/Karte/Karte';
import Reisen from './components/pages/Reisen/reisen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" element={<Login/>} />
          <Route path="/karte" element={<Karte/>}/>
          <Route path="/reisen" element={<Reisen/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
