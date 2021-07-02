import React, {Component, useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {Shop_Route} from "../utils/constants";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user)
    return (
        <Switch>
            {!user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component = {Component} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component = {Component} exact />
            )}
            <Redirect to = {Shop_Route} />
        </Switch>
    );
};

export default AppRouter;