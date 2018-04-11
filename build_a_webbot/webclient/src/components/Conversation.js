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
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  };
};

class Conversation extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children)
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
        className={classes.root}
        ref="ScrollArea"
        contentClassName={classes.scrollContent}
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
