import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, Button, TextField, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, currentUser, setRole } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(email, password);

      history.push("/app/home");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h1">
          Schedulr
        </Typography>
        <Typography align="center" variant="h4">
          Login
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.root}
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                value={email}
                label="Username"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                autoComplete="off"
                onInput={(e) => setEmail(e.target.value)}
              ></TextField>
              <TextField
                value={password}
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                onInput={(e) => setPassword(e.target.value)}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                disabled={loading}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justify="flex-end"
          spacing={1}
        >
          <Grid item xs={4}>
            <Link href="/signup">Create account</Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="/forgot-password">Forgot password?</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Login;
