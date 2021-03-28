import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import {
    BrowserRouter as Router,
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Dashboard/>
        </Router>
    );
}

export default App;
