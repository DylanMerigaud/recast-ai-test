import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import ReactHtmlParser from 'react-html-parser';
import CopyToClipboad from 'components/utils/CopyToClipboad';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.serverMessage,
    borderRadius: '25px',
    padding: '8px 15px 8px 15px',
    margin: '0 0 6px 0',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
});

function getAdditionalStyles({
  fromUser,
  startingGroup,
  endingGroup,
  inGroup,
  theme,
  pending,
}) {
  const additionalStyles = {
    alignSelf: fromUser ? 'flex-end' : 'flex-start',
    marginLeft: '10px',
    marginRight: '10px',
  };
  if (pending)
    additionalStyles.backgroundColor = theme.palette.background.pendingMessage;
  else if (fromUser)
    additionalStyles.backgroundColor = theme.palette.background.userMessage;
  additionalStyles[fromUser ? 'marginLeft' : 'marginRight'] = '25px';
  if (inGroup) {
    const corners = fromUser ? [25, 10, 10, 25] : [10, 25, 25, 10];
    additionalStyles.marginTop = '2px';
    additionalStyles.marginBottom = '2px';
    if (startingGroup) corners[fromUser ? 1 : 0] = 25;
    if (endingGroup) {
      corners[fromUser ? 2 : 3] = 25;
      additionalStyles.marginBottom = '6px';
    }
    additionalStyles.borderRadius = corners.join('px ') + 'px';
  }
  return additionalStyles;
}

function transformNode(node, index, classes) {
  if (node.type === 'text') return <span key={index}>{node.data}</span>;
  if (node.type === 'tag') {
    if (
      node.name === 'span' &&
      (node.attribs || {}).class === 'copy-to-clipboard-welcomeMessage' &&
      node.children.length > 0
    ) {
      return <CopyToClipboad key={index} text={node.children[0].data} />;
    }
  }
}

function Message({
  classes,
  theme,
  content,
  type,
  fromUser,
  startingGroup,
  endingGroup,
  inGroup,
  pending,
}) {
  const additionalStyles = getAdditionalStyles({
    fromUser,
    startingGroup,
    endingGroup,
    inGroup,
    theme,
    pending,
  });
  if (type === 'html')
    return (
      <Typography
        variant="body1"
        style={additionalStyles}
        className={classes.root}
      >
        {ReactHtmlParser(content, {
          transform: (node, index) => transformNode(node, index, classes),
        })}
      </Typography>
    );
  else if (type === 'image') return 'todo';
  else
    return (
      <Typography
        variant="body1"
        style={additionalStyles}
        className={classes.root}
      >
        <Linkify>{content}</Linkify>
      </Typography>
    );
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  fromUser: PropTypes.bool,
  type: PropTypes.string,
  startingGroup: PropTypes.bool,
  endingGroup: PropTypes.bool,
  inGroup: PropTypes.bool,
  pending: PropTypes.bool,
};

Message.defaultProps = {
  fromUser: false,
  type: 'text',
  startingGroup: false,
  endingGroup: false,
  inGroup: false,
  pending: false,
};

export default withStyles(styles, { withTheme: true })(Message);
