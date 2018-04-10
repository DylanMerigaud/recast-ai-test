import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import ScrollArea from "react-scrollbar";
import PropTypes from "prop-types";

const styles = theme => {
  return {
    root: {
      flexGrow: "1",
      backgroundColor: theme.palette.background.default
    },
    scrollContent: {
      padding: "10px 0 10px 0",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100%"
    }
  };
};

class Conversation extends Component {
  componentDidUpdate() {
    this.timeout = setTimeout(() => this.refs.ScrollArea.scrollBottom(), 10);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    const { classes, children, theme } = this.props;
    return (
      <ScrollArea
        vertical
        verticalScrollbarStyle={{
          backgroundColor: theme.palette.scrollBar || "red"
        }}
        ref="ScrollArea"
        contentClassName={classes.scrollContent}
        className={classes.root}
      >
        {children}
      </ScrollArea>
    );
  }
}

Conversation.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Conversation);
