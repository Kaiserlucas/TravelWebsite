import './App.css';
import Login from './components/pages/Login/Login';
import Karte from './components/pages/Karte/Karte';
import Reisen from './components/pages/Reisen/reisen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/karte">
            <Karte />
          </Route>
          <Route path="/reisen">
            <Reisen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
