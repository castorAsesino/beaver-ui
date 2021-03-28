import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import {Button, TablePagination, TableSortLabel} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from "../util/ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    alignNewButton: {
        textAlign: 'right'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function User() {
    const classes = useStyles();
    const [userList, setUserList] = useState([])
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const history = useHistory();
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState();
    const [orderBy, setOrderBy] = useState();
    const [asc, setAsc] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user', {params: {page, size, orderBy, asc}}
        ).then(rsp => {
            setUserList(rsp.data.content)
            setTotalElements(rsp.data.totalElements)
        }).catch(err => console.error(err))
    }, [page, size, orderBy, asc])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const removeItem = () => {
        axios.delete(`http://localhost:8080/api/v1/user/${userId}`
        ).then(rsp => {
            setPage(0);
        }).catch(err => console.error(err))
            .finally(() => setOpenDialog(false))
    }

    const createSortHandler = (property) => (event) => {
        if (property === orderBy)
            setAsc(!asc)
        else
            setAsc(true)
        setOrderBy(property);
    };

    const getSorteableHead = (property, label) => {
        return (
            <TableCell
            sortDirection={orderBy === property ? (asc ? 'asc' : 'desc') : false}>
            <TableSortLabel
                active={orderBy === property}
                direction={orderBy === property&& asc ? 'asc' : 'desc'}
                onClick={createSortHandler(property)}>
                {label}
                {orderBy === property ? (
                    <span className={classes.visuallyHidden}>
                  {asc ? 'sorted ascending' : 'sorted descending'}
                </span>
                ) : null}
            </TableSortLabel>
        </TableCell>)
    }

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom>
                        User List
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.alignNewButton}>
                    <Button variant="contained" color="primary" onClick={() => history.push('/user/new')}>
                        New
                    </Button>
                </Grid>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {getSorteableHead('username','Username')}
                        {getSorteableHead('firstname','Firstname')}
                        {getSorteableHead('lastname','Lastname')}
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.firstname}</TableCell>
                            <TableCell>{row.lastname}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => history.push(`/user/${row.id}/edit`)}>
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        setOpenDialog(true);
                                        setUserId(row.id);
                                    }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
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
            <ConfirmationDialog
                message={'Do you want to delete this item?'}
                open={openDialog}
                onCancel={() => setOpenDialog(false)}
                onAccept={() => removeItem()}/>
        </Paper>
    );
}
