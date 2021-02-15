import { Card, CardHeader, CardActions, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import grey from "@material-ui/core/colors/grey";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SampleSalesData from "../test-data/demo-sales-data.json";

// define colors
const superLightGrey = grey[200];
const lightGrey = grey[500];
const darkGrey = grey[700];
const midGrey = grey[600];
// Card styling.
const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 20,
    color: lightGrey,
    textTransform: "capitalize",
    textAlign: "left",
  },
  displayNum: {
    fontSize: 35,
    color: darkGrey,

    margin: "18px",

    borderBottom: ".1rem solid",
    borderBottomColor: superLightGrey,
  },
  cardFooter: {
    fontSize: 12,
    color: midGrey,

    marginLeft: "18px",
    marginRight: "18px",
    marginBottom: "0px",
  },
  button: { color: lightGrey },
});

export function TotalSalesCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton className={classes.button}>
            <InfoOutlinedIcon />
          </IconButton>
        }
        title={<Typography className={classes.title}>total sales</Typography>}
      />

      <Typography className={classes.displayNum}>
        {SampleSalesData.businessSales.sales.totalSales}
      </Typography>

      <Typography className={classes.cardFooter}>Card Footer</Typography>

      <CardActions></CardActions>
    </Card>
  );
}
export function DailySalesCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton className={classes.button}>
            <InfoOutlinedIcon />
          </IconButton>
        }
        title={<Typography className={classes.title}>daily sales</Typography>}
      />

      <Typography className={classes.displayNum}>
        {SampleSalesData.businessSales.sales.dailySales}
      </Typography>

      <Typography className={classes.cardFooter}>Card Footer</Typography>

      <CardActions></CardActions>
    </Card>
  );
}

export function ItemCard(item) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton className={classes.button}>
            <InfoOutlinedIcon />
          </IconButton>
        }
        title={<Typography className={classes.title}>{item}s Sold</Typography>}
      />

      <Typography className={classes.displayNum}>NumSold</Typography>

      <Typography className={classes.cardFooter}>
        Total Sales Percentage: x%
      </Typography>

      <CardActions></CardActions>
    </Card>
  );
}
