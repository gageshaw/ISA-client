import React, { useState } from "react";
import { Grid, Typography, Button, TextField, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  form: { width: "50vw" },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
          Reset Password
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.root}
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={7}>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
              <TextField
                value={email}
                label="Email"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                autoComplete="off"
                onInput={(e) => setEmail(e.target.value)}
              ></TextField>
            </Grid>

            <Grid item xs={7}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                disabled={loading}
              >
                Reset Password
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
              Need an account? <Link href="/signup">Sign Up</Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
