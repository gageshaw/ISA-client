import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PublicRoutes from "../routes/PublicRoutes";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoutes from "../routes/PrivateRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/app" component={PrivateRoutes} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
