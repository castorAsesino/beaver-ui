import React from "react";
import {Route, Switch} from "react-router-dom";
import UserRoute from "../User/UserRoute";

export const routerList = (
    <Switch>
        <Route path={`/user`} component={UserRoute}/>
    </Switch>
)
