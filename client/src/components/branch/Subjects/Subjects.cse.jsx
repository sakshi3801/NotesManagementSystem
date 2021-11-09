import React from "react";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "80px",
    paddingRight: "40px"
  }
});

export default function Subjects(props) {
  const classes = useStyles();

  const subjects = [
    ["sub1a", "sub1b", "sub1c", "sub1d", "sub1e", "sub1f"],
    ["sub2a", "sub2b", "sub2c", "sub2d", "sub2e", "sub2f"],
    ["sub3a", "sub3b", "sub3c", "sub3d", "sub3e", "sub3f"],
    ["Artificial Intelligence", "Compiler Design", "Computer Networks", "Engineering Mathematics-IV", "JAVA Programming", "Operating System"],
    ["Information Retrieval", "Linear and Non-Linear Optimization", "Machine Learning", "Human Computer Interaction", "Software Engineering", "Cryptography and Network Security"],
    ["sub6a", "sub6b", "sub6c", "sub6d", "sub6e", "sub6f"],
    ["sub7a", "sub7b", "sub7c", "sub7d", "sub7e", "sub7f"],
    ["sub8a", "sub8b", "sub8c", "sub8d", "sub8e", "sub8f"]
  ];


  return (
    <div>
      {props.sem > 0 ? (
        <Grid
          semester={props.sem}
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          {subjects[props.sem - 1].map((subject, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={index} name={subject} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </div>
  );
}
