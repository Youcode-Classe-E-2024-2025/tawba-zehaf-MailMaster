import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Campaigns from './components/Campaigns';
import Subscribers from './components/Subscribers';
import Newsletters from './components/Newsletters';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link to="/subscribers">Subscribers</Link>
            </li>
            <li>
              <Link to="/newsletters">Newsletters</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/subscribers" element={<Subscribers />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/" element={<Campaigns />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
