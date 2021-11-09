import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { LinkContainer } from "react-router-bootstrap";
import Units from './Units';
import '../../../css/card.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    height: '50%',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SubjectCard(props) {
  const classes = useStyles();
  const subject = props.name.replace(/ /g, "")
  console.log(subject);
  const path = "/images/" + subject + ".jpg";
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Card className={classes.root} id='card'>
        {/* <LinkContainer id="router-link" to={path}> */}
        <CardActionArea onClick={handleOpen}>
        {/* image={process.env.PUBLIC_URL + path} */}
          <CardMedia component="img" height = "140" image={process.env.PUBLIC_URL + path} alt="Subject Image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
          </CardContent> 
        </CardActionArea>
        {/* </LinkContainer> */}
        <CardActions>
          {/* <LinkContainer id="router-link" to={path}> */}
          <Button onClick={handleOpen} size="small" color="primary">
            See Notes
          </Button>
          {/* </LinkContainer> */}
        </CardActions>
      </Card>
      <div >
        <Modal 
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper} id='modal'>
              <h2 id="transition-modal-title">{props.name}</h2>
              <Units name={props.name} />
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}