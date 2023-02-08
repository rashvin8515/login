import './App.css';
import Login from './Component/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from './contexts/RequireAuth'
import Dashboard from './Component/Dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
              <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
