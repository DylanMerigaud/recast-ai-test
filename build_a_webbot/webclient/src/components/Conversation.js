import React from "react";
import { withStyles } from "material-ui/styles";
import Message from "components/Message";
import BotIsTyping from "components/BotIsTyping";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";

const styles = theme => {
  console.log(theme);
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

const fakeData = {
  messages: [
    {
      origin: "bot",
      messages: [
        "Hello, how can I help you ?",
        "Hello, how can I help you ?",
        "Hello, how can I help you ?",
        "Hello, how can I help you ?"
      ]
    },
    {
      origin: "user",
      messages: ["I don't need you to live", "I don't need you to live"]
    },
    {
      origin: "bot",
      messages: ["Hello, how can I help you ?"]
    },
    {
      origin: "user",
      messages: ["I don't need you to live"]
    },
    {
      origin: "bot",
      messages: ["Hello, how can I help you ?"]
    },
    {
      origin: "user",
      messages: ["I don't need you to live"]
    },
    {
      origin: "bot",
      messages: ["Hello, how can I help you ?"]
    },
    {
      origin: "user",
      messages: ["I don't need you to live"]
    },
    {
      origin: "bot",
      messages: ["Hello, how can I help you ?"]
    },
    {
      origin: "user",
      messages: ["I don't need you to live"]
    }
  ]
};

function renderThumb({ style, ...thumbProps }, props) {
  const thumbStyle = {
    backgroundColor: props.theme.palette.background.paper,
    borderRadius: "inherit"
  };
  return <div style={{ ...style, ...thumbStyle }} {...thumbProps} />;
}

function Conversation(props) {
  const { classes } = props;

  return (
    <Scrollbars
      className={classes.root}
      renderThumbVertical={thumbProps => renderThumb(thumbProps, props)}
    >
      <div className={classes.scrollContent}>
        {fakeData.messages.map(({ messages, origin }, index) => {
          const messagesLength = messages.length;
          const isAGroup = messagesLength > 1;
          return messages.map((value, index2) => {
            return (
              <Message
                value={value}
                fromUser={origin === "user"}
                key={`${index}|${index2}`}
                startingGroup={isAGroup && index2 === 0}
                endingGroup={isAGroup && index2 === messagesLength - 1}
                inGroup={isAGroup}
              />
            );
          });
        })}
        <BotIsTyping show />
      </div>
    </Scrollbars>
  );
}

Conversation.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Conversation);
