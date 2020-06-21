import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, Avatar, TextField } from "@material-ui/core";
import auth from "./../auth/auth-helper";
import { comment } from "./api-post";

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

export default function Comments() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const jwt = auth.isAuthenticated();

  const addComment = event => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();

      comment({ userId: jwt.user._id }, { t: jwt.token }, props.post._id, {
        text: text,
      }).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setText("");
          props.updateComments(data.comments);
        }
      });
    }
  };

  const handleChange = () => {};

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={"/api/users/photo/" + auth.isAuthenticated().user._id}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
    </div>
  );
}
