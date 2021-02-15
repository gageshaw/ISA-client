import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";

import Signup from "../components/Signup";

const PublicRoutes = ({ match }) => {
  return (
    <div>
      <Route path={`/forgot-password`} component={ForgotPassword} />
      <Route path={`/signup`} component={Signup} />
      <Route path={`/`} exact component={Login} />
    </div>
  );
};

export default PublicRoutes;
