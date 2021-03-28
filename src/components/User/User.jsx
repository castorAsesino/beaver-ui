import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import {Tooltip} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useHistory} from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from "../util/ConfirmationDialog";
import {Link} from "react-router-dom";
import DataTable from "../util/DataTable";

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
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const history = useHistory();
    const [openDialog, setOpenDialog] = useState(false);
    const [item, setItem] = useState();

    const rowSettings = {
        username: {
            label: 'Username',
            sortable: true
        },
        firstname: {
            label: 'Firstname',
            sortable: true
        },
        lastname: {
            label: 'Lastname',
            sortable: true
        },
        actions: {
            label: 'Acciones',
            cellRendering: item => (
                <React.Fragment>
                        <Link
                            to={`user/${item.id}/edit`}
                            style={{ textDecoration: 'none' }}>
                            <Tooltip title="Edit" placement="top-start">
                                <IconButton aria-label="Edit">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Link
                            style={{ textDecoration: 'none' }}
                            onClick={() => {
                                setOpenDialog(true);
                                setItem(item);
                            }}>
                            <Tooltip
                                title="Delete"
                                placement="top-start">
                                <IconButton aria-label="Delete" color="default">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                </React.Fragment>
            )
        }
    };


    useEffect(() => {
        handleReloadTable(0, 10, undefined, undefined);
    }, [])

    const removeItem = () => {
        axios.delete(`http://localhost:8080/api/v1/user/${item.id}`
        ).then(rsp => {
            setPage(0);
        }).catch(err => console.error(err))
            .finally(() => setOpenDialog(false))
    }

    const handleReloadTable = (page, size, orderBy, asc) => {
        axios.get('http://localhost:8080/api/v1/user', {params: {page, size, orderBy, asc}}
        ).then(rsp => {
            setUserList(rsp.data.content)
            setTotalElements(rsp.data.totalElements)
        }).catch(err => console.error(err))
    }

    return (
        <Paper className={classes.paper}>
            <DataTable
                dataTableTitle={'User List'}
                rowSettings={rowSettings}
                onReloadTable={handleReloadTable}
                dataList={userList}
                totalElements={totalElements}
                handleNewButton={() => history.push('/user/new')}
                page={page}
                setPage={setPage}
            />
            <ConfirmationDialog
                message={'Do you want to delete this item?'}
                open={openDialog}
                onCancel={() => setOpenDialog(false)}
                onAccept={() => removeItem()}/>
        </Paper>
    );
}
