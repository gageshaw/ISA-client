import React, { useState } from "react";
import { Grid, Typography, Button, TextField, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
}));

function Signup() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      history.push("/app/home");
    } catch {
      setError("Failed to create an account");
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
          Signup
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
              <TextField
                value={passwordConfirm}
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                onInput={(e) => setPasswordConfirm(e.target.value)}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                disabled={loading}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid item xs={4}>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link href="/">Login</Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Signup;
