import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => {
  return {
    root: {
      padding: '10px 0 10px 0',
      overflow: 'auto',
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.scrollBar,
      },
    },
  };
};

class Conversation extends Component {
  componentDidUpdate(prevProps) {
    const { ScrollArea } = this.refs;
    if (ScrollArea && prevProps.children !== this.props.children)
      this.timeout = setTimeout(
        () => (ScrollArea.scrollTop = ScrollArea.scrollHeight),
        10,
      );
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root} ref="ScrollArea">
        {children}
      </div>
    );
  }
}

Conversation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Conversation);
