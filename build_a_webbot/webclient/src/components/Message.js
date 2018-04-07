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

function Message(props) {
  const {
    classes,
    theme,
    value,
    fromUser,
    startingGroup,
    endingGroup,
    inGroup
  } = props;
  console.log(props);
  const style = {
    alignSelf: fromUser ? "flex-end" : "flex-start"
  };
  if (fromUser) style.backgroundColor = theme.palette.background.userMessage;

  style[fromUser ? "marginLeft" : "marginRight"] = "15px";
  if (inGroup) {
    const corners = fromUser ? [25, 5, 5, 25] : [5, 25, 25, 5];
    style.marginTop = "2px";
    style.marginBottom = "2px";
    if (startingGroup) corners[fromUser ? 1 : 0] = 25;
    if (endingGroup) {
      corners[fromUser ? 2 : 3] = 25;
      style.marginBottom = "6px";
    }
    style.borderRadius = corners.join("px ") + "px";
  }
  return (
    <Typography variant="body1" style={style} className={classes.root}>
      {value}
    </Typography>
  );
}

Message.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  value: PropTypes.string,
  fromUser: PropTypes.bool,
  startingGroup: PropTypes.bool,
  endingGroup: PropTypes.bool,
  inGroup: PropTypes.bool
};

Message.defaultProps = {
  value: "",
  fromUser: false,
  startingGroup: false,
  endingGroup: false,
  inGroup: false
};

export default withStyles(styles, { withTheme: true })(Message);
