import { Button, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
// import TextField from "@material-ui/core/TextField";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import SendIcon from "@material-ui/icons/Send";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `10px auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

type ChatInputProps = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { message, setMessage, sendMessage } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapForm}>
        <TextField
          id="standard-text"
          label="Input Message"
          className={classes.wrapText}
          //margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={sendMessage}
        >
          <SendIcon />
        </Button>
      </div>
    </>
  );
};

export default ChatInput;
