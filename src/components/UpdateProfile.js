import React, { useState } from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formContainer: { padding: "25px" },
}));

function UpdateProfile() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updatePassword, updateEmail } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("You have successfully updated your account");
        //email = "";
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Grid item xs={12} className={classes.formContainer}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Update Profile
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
                {message && <Alert severity="success">{message}</Alert>}

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
                  label="New Password (leave blank to keep current password)"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                  onInput={(e) => setPassword(e.target.value)}
                ></TextField>
                <TextField
                  value={passwordConfirm}
                  label="Confirm Password (leave blank to keep current password)"
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
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
export default UpdateProfile;
