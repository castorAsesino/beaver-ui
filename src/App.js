import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user', { params: { page: 0, size:  10} }
            ).then(rsp => {
            setUserList(rsp.data.content)
        }).catch(err => console.error(err))
    }, [])


    return (
        <table>
            <tr>
                <th>Username</th>
                <th>Firstname</th>
                <th>Lastname</th>
            </tr>
            {userList.map(user =>
                <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                </tr>)}
        </table>
    );
}

export default App;
