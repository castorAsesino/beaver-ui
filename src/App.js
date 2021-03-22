import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [userList, setUserList] = useState([])
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user', {params: {page, size}}
        ).then(rsp => {
            setUserList(rsp.data.content)
            setTotalPages(rsp.data.totalPages - 1)
        }).catch(err => console.error(err))
    }, [page, size])

    const handlePrevious = () => {
        setPage(page === 0 ? 0 : page - 1)
    }

    const handleNext = () => {
        setPage(page === totalPages ? totalPages : page + 1)
    }

    const handleSize = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
    }

    return (
        <React.Fragment>
            <button type="button" disabled={page === 0} onClick={handlePrevious}>Previous</button>
            <button type="button" disabled={page === totalPages} onClick={handleNext}>Next</button>
            <select value={size} onChange={(event => handleSize(event))}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
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
        </React.Fragment>
    );
}

export default App;
