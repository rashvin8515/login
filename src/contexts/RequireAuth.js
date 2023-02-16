import React from 'react';
import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../contexts/AuthContext'

function RequireAuth({ children }) {
    const location = useLocation();
    // const Navigate = useNavigate()
    const { authed } = useAuth();

    return (authed === true) || localStorage.getItem("token") ? children : <Navigate to="/" replace state={{ path: location.pathname }} />;
}

export default RequireAuth