import React from "react";
import { withStyles } from "material-ui/styles";
import Message from "components/Message";
import BotIsTyping from "components/BotIsTyping";

const styles = theme => ({
  root: {
    backgroundColor: "red",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px",
    overflow: "auto"
  }
});

const fakeData = {
  messages: [
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" },
    { origin: "bot", value: "Hello, how can I help you ?" },
    { origin: "user", value: "I don't need you to live" }
  ]
};

function Conversation(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {fakeData.messages.map((message, index) => {
        return <Message {...message} key={index} />;
      })}
      <BotIsTyping show />
    </div>
  );
}

export default withStyles(styles)(Conversation);
