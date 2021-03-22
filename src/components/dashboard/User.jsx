import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import {TablePagination} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function User() {
    const classes = useStyles();
    const [userList, setUserList] = useState([])
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user', {params: {page, size}}
        ).then(rsp => {
            setUserList(rsp.data.content)
            setTotalElements(rsp.data.totalElements)
        }).catch(err => console.error(err))
    }, [page, size])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.firstname}</TableCell>
                            <TableCell>{row.lastname}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalElements}
                rowsPerPage={size}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
