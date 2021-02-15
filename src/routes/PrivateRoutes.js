import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { uniqBy } from "lodash";
import rolesConfig from "../config/roles";
import Drawer from "../components/Drawer";
import { useAuth } from "../contexts/AuthContext";
import * as Routes from "./index";
// TODO: Replace hardcoded roles with redux, localStorage, or get from server.

const PrivateRoutes = ({ match }) => {
  const { currentUser, role } = useAuth();

  const roles = [
    //user roles + concatinate common role
    role,
    "common",
  ];

  let allowedRoutes = roles.reduce((acc, role) => {
    return [...acc, ...rolesConfig[role].routes];
  }, []);

  // For removing duplicate entries.
  allowedRoutes = uniqBy(allowedRoutes, "component");
  return currentUser ? (
    <Drawer
      contents={allowedRoutes.map(({ component, url }) => (
        <Route
          key={component}
          path={`${match.path}${url}`}
          component={Routes[component]}
        />
      ))}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoutes;
