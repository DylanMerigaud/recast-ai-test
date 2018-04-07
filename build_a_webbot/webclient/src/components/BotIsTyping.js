import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    backgroundColor: "green",
    borderRadius: "25px",
    padding: "6px 8px 6px 8px",
    margin: "6px 0 6px 0",
    alignSelf: "flex-start"
  },
  textBlink: {
    animation: "blinker 2s linear infinite"
  },
  "@keyframes blinker": {
    "50%": {
      opacity: "0.2"
    }
  }
});

function BotIsTyping(props) {
  const { classes, show } = props;

  if (show)
    return (
      <div className={classes.root}>
        <span className={classes.textBlink}>Bot is thinking ...</span>
      </div>
    );
}

export default withStyles(styles)(BotIsTyping);
