import logo from './logo.svg';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SoundSync from './SoundSync';
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="SoundSync" />} />
          <Route path="/SoundSync/*" element={<SoundSync/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
