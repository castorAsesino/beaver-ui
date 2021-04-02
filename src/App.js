import './App.css';
import React, {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthService from "./services/auth.service";
import {
    BrowserRouter as Router
} from 'react-router-dom';
import Login from "./components/Login/Login";

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user)
            setCurrentUser(user);
    }, []);

    return (
        <Router>
            {currentUser ? (
                <Dashboard/>
            ) : (
                <Login/>
            )}
        </Router>
    );
}

export default App;
