import React from 'react';
import { connect } from 'react-redux';
import Message from 'components/conversation/Message';
import BotIsThinking from 'components/conversation/BotIsThinking';
import Conversation from 'components/conversation/Conversation';
import PropTypes from 'prop-types';

function originIsEqual(originOne, originTwo) {
  if (
    (originOne === 'user' && originTwo !== 'user') ||
    (originOne !== 'user' && originTwo === 'user')
  )
    return false;
  else return true;
}

function getMessageGroupProps(messages, index) {
  const firstOfAllMessages = index === 0;
  const lastOfAllMessages = index === messages.length - 1;
  const inGroup =
    (!firstOfAllMessages &&
      originIsEqual(messages[index].origin, messages[index - 1].origin)) ||
    (!lastOfAllMessages &&
      originIsEqual(messages[index].origin, messages[index + 1].origin));
  const startingGroup =
    inGroup &&
    (firstOfAllMessages ||
      !originIsEqual(messages[index].origin, messages[index - 1].origin));
  const endingGroup =
    inGroup &&
    (lastOfAllMessages ||
      !originIsEqual(messages[index].origin, messages[index + 1].origin));
  return {
    inGroup,
    startingGroup,
    endingGroup,
  };
}

function Chat(props) {
  const { messages, botIsThinking } = props;
  return (
    <Conversation>
      {messages.map(({ content, origin, _id, tempId, type }, index) => {
        return (
          <Message
            content={content}
            type={type}
            fromUser={origin === 'user'}
            key={_id || tempId}
            pending={!_id}
            {...getMessageGroupProps(messages, index)}
          />
        );
      })}
      <BotIsThinking show={botIsThinking} />
    </Conversation>
  );
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  botIsThinking: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  messages: [],
  botIsThinking: false,
};

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    botIsThinking: state.chat.botIsThinking,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
