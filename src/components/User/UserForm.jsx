import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useHistory, useParams} from "react-router-dom";
import {Button, IconButton, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    buttonMargin: {
        marginRight: '1rem'
    }
}));


export default function AddressForm() {
    const classes = useStyles();
    const {userId} = useParams();
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (userId)
            axios.get(`http://localhost:8080/api/v1/user/${userId}`)
                .then(rsp => setUser(rsp.data))
                .catch(err => console.error(err));
    }, [userId])

    const handleChangeField = (field, event) => {
        setUser({
            ...user,
            [field]: event.target.value
        })
    }

    const handleSave = () => {
        axios({
            method: userId ? 'put' : 'post',
            url: `http://localhost:8080/api/v1/user${userId ? '/' + userId : ''}`,
            data: user
        }).then(rsp => history.push('/user'))
            .catch(err => console.error(err));
    }

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                User
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="firstname"
                        name="firstname"
                        label="First name"
                        fullWidth
                        value={user.firstname}
                        onChange={(event => handleChangeField('firstname', event))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="lastname"
                        name="lastname"
                        label="Last name"
                        fullWidth
                        value={user.lastname}
                        onChange={(event => handleChangeField('lastname', event))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        value={user.username}
                        onChange={(event => handleChangeField('username', event))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={user.password}
                        onChange={(event => handleChangeField('password', event))}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        onClick={handleSave}>
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push('/user')}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
