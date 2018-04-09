import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      flexGrow: "1"
    },
    scrollContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 15px 10px 15px"
    }
  };
};

function renderThumb({ style, ...thumbProps }, theme) {
  const thumbStyle = {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "inherit"
  };
  return <div style={{ ...style, ...thumbStyle }} {...thumbProps} />;
}

function renderView({ style, ...viewProps }) {
  const viewStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginRight: "-18px",
    marginBottom: "-18px"
  };
  return <div style={{ ...style, ...viewStyle }} {...viewProps} />;
}

class Conversation extends Component {
  componentDidUpdate(prevProps) {
    this.refs.bottomOfScrollContent.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { classes, children, theme } = this.props;
    return (
      <Scrollbars
        ref="scrollbar"
        className={classes.root}
        renderThumbVertical={thumbProps => renderThumb(thumbProps, theme)}
        renderView={viewProps => renderView(viewProps)}
      >
        <div className={classes.scrollContent}>
          {children}
          <div ref="bottomOfScrollContent" />
        </div>
      </Scrollbars>
    );
  }
}

Conversation.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Conversation);
