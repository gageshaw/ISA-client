import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import grey from "@material-ui/core/colors/grey";

import { TotalSalesCard, DailySalesCard } from "./Tiles";
import { Grid } from "@material-ui/core";

//////////////////////////////          STYLING         ////////////////////////////////////////
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    CardContainer: { padding: "25px", backgroundColor: grey[200] },
  })
);

////////////////////////////////////////        REPORTS FUNCTION        //////////////////////////////
function Reports() {
  const classes = useStyles();

  //////////////////////////////////////           RETURN              ////////////////////////////////////
  return (
    <Grid item xs={12} xl={12} className={classes.CardContainer}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item>
          <TotalSalesCard />
        </Grid>
        <Grid item>
          <DailySalesCard />
        </Grid>
        <Grid item>
          <TotalSalesCard />
        </Grid>
        <Grid item>
          <TotalSalesCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Reports;
