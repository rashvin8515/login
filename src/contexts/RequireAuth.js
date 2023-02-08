import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../contexts/AuthContext'
function RequireAuth({ children }) {
    const location = useLocation();
    const Navigate = useNavigate()
    const { authed } = useAuth();

    return (authed === true) || localStorage.getItem("isLoggedIn", true) ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth