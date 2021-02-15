import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  ButtonGroup,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function NavMenu(props) {
  const history = useHistory();
  const { logout, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100vw",
    },
    button: {
      disabled: { loading },
    },
  }));
  const classes = useStyles();

  function handleClickNav(route) {
    setLoading(true);
    const newRoute = "/app" + route;
    history.push(newRoute);
    setLoading(false);
  }
  async function handleClickLogout() {
    setLoading(true);
    await logout();
    history.push("/");
    setLoading(false);
  }

  const managerEnd = (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Managers nav</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ButtonGroup
          className={classes.button}
          fullWidth
          orientation="vertical"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <Button
            onClick={() => {
              handleClickNav("/manager");
            }}
          >
            Manager Page
          </Button>
        </ButtonGroup>
      </AccordionDetails>
    </Accordion>
  );

  const ownerEnd = (
    <>
      {managerEnd}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Owners nav</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroup
            fullWidth
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={() => {
                handleClickNav("/owner");
              }}
            >
              Owner Page
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );

  let menuEnd;

  if (role === "manager") {
    menuEnd = managerEnd;
  }

  if (role === "owner") {
    menuEnd = ownerEnd;
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Dashboard</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroup
            fullWidth
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={() => {
                handleClickNav("/analysis");
              }}
            >
              Analysis
            </Button>
            <Button
              onClick={() => {
                handleClickNav("/schedule");
              }}
            >
              Workplace Schedule
            </Button>
            <Button
              onClick={() => {
                handleClickNav("/reports");
              }}
            >
              Workplace Stats
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      {menuEnd}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroup
            fullWidth
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={() => {
                handleClickNav("/update-profile");
              }}
            >
              Update Profile
            </Button>
            <Button
              onClick={() => {
                handleClickLogout();
              }}
            >
              Log Out
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default NavMenu;
