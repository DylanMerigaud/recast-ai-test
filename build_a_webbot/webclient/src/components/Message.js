import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "25px",
    padding: "6px 8px 6px 8px",
    margin: "6px 0 6px 0"
  }
});

function getAdditionalStyles({
  fromUser,
  startingGroup,
  endingGroup,
  inGroup,
  theme,
  pending
}) {
  const additionalStyles = {
    alignSelf: fromUser ? "flex-end" : "flex-start"
  };
  if (pending)
    additionalStyles.backgroundColor = theme.palette.background.pendingMessage;
  else if (fromUser)
    additionalStyles.backgroundColor = theme.palette.background.userMessage;
  additionalStyles[fromUser ? "marginLeft" : "marginRight"] = "15px";
  if (inGroup) {
    const corners = fromUser ? [25, 5, 5, 25] : [5, 25, 25, 5];
    additionalStyles.marginTop = "2px";
    additionalStyles.marginBottom = "2px";
    if (startingGroup) corners[fromUser ? 1 : 0] = 25;
    if (endingGroup) {
      corners[fromUser ? 2 : 3] = 25;
      additionalStyles.marginBottom = "6px";
    }
    additionalStyles.borderRadius = corners.join("px ") + "px";
  }
  return additionalStyles;
}

function Message({
  classes,
  theme,
  text,
  fromUser,
  startingGroup,
  endingGroup,
  inGroup,
  pending
}) {
  const additionalStyles = getAdditionalStyles({
    fromUser,
    startingGroup,
    endingGroup,
    inGroup,
    theme,
    pending
  });
  return (
    <Typography
      variant="body1"
      style={additionalStyles}
      className={classes.root}
    >
      {text}
    </Typography>
  );
}

Message.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  text: PropTypes.string,
  fromUser: PropTypes.bool,
  startingGroup: PropTypes.bool,
  endingGroup: PropTypes.bool,
  inGroup: PropTypes.bool,
  pending: PropTypes.bool
};

Message.defaultProps = {
  value: "",
  fromUser: false,
  startingGroup: false,
  endingGroup: false,
  inGroup: false,
  pending: false
};

export default withStyles(styles, { withTheme: true })(Message);
