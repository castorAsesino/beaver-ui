import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, TablePagination, TableSortLabel} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";

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

export default function DataTable(props) {
    const classes = useStyles();
    const {dataTableTitle, page, setPage, rowSettings, dataList, totalElements, onReloadTable, handleNewButton} = props;
    const [orderBy, setOrderBy] = useState();
    const [asc, setAsc] = useState();
    const [size, setSize] = useState(10)
    //const [page, setPage] = useState(0)

    useEffect(() => {
        onReloadTable(page, size, orderBy, asc)
    }, [page, size, orderBy, asc])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const createSortHandler = (property) => {
        if (property === orderBy)
            setAsc(!asc)
        else
            setAsc(true)
        setOrderBy(property);
    };

    const getSorteableHead = (key) => {
        if (rowSettings[key].sortable)
            return (
                <TableCell
                    key={key}
                    sortDirection={orderBy === key ? (asc ? 'asc' : 'desc') : false}>
                    <TableSortLabel
                        active={orderBy === key}
                        direction={orderBy === key && asc ? 'asc' : 'desc'}
                        onClick={()=>createSortHandler(key)}>
                        {rowSettings[key].label}
                        {orderBy === key ? (
                            <span className={classes.visuallyHidden}>
                  {asc ? 'sorted ascending' : 'sorted descending'}
                </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>)
        else
            return (
                <TableCell key={key}>
                    {rowSettings[key].sortable}
                </TableCell>
            )
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom>
                        {dataTableTitle}
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.alignNewButton}>
                    <Button variant="contained" color="primary" onClick={handleNewButton}>
                        New
                    </Button>
                </Grid>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {Object.keys(rowSettings).map(key =>
                            getSorteableHead(key))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList.map((row) => (
                        <TableRow key={row.id}>
                            {Object.keys(rowSettings).map(key =>
                                <TableCell key={`${key}-${row.id}`}>{
                                    rowSettings[key].cellRendering ? rowSettings[key].cellRendering(row) : row[key]
                                }</TableCell>)}
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
            /></Fragment>
    )
}
