import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SoundSync from './SoundSync';
import Login from './SoundSync/Login/login';
import { Provider } from "react-redux";
import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="login"/>} />
            <Route path="/SoundSync/*" element={<SoundSync/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
