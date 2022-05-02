
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import AllRoutes from './AllRoutes.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
