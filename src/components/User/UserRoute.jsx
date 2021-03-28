import React from 'react';
import { Route } from 'react-router-dom';

import User from './User';
import UserForm from './UserForm';

export default function UserRoute (props) {
    return(
    <React.Fragment>
        <Route exact path={`${props.match.url}/`} component={User} />
        <Route exact path={`${props.match.url}/new`} component={UserForm} />
        <Route
            exact
            path={`${props.match.url}/:userId/edit`}
            component={UserForm}
        />
    </React.Fragment>
)
}
