import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import LightbulbOutline from '@material-ui/icons/LightbulbOutline';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import DialogConfirm from 'components/dialogs/DialogConfirm';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {},
  userSelectable: {
    userSelect: 'text',
  },
});

class SettingsButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openResetConfirmation: false,
    };
  }

  setOpenResetConfirmation(open) {
    this.setState({ openResetConfirmation: open });
  }

  render() {
    const {
      classes,
      changeTheme,
      resetConversation,
      conversationID,
    } = this.props;
    const { openResetConfirmation } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="Change theme" placement="left">
          <IconButton onClick={changeTheme}>
            <LightbulbOutline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset conversation" placement="left">
          <IconButton onClick={() => this.setOpenResetConfirmation(true)}>
            <SettingsBackupRestore />
          </IconButton>
        </Tooltip>
        <DialogConfirm
          title="Reset conversation"
          open={openResetConfirmation}
          onConfirm={() => {
            this.setOpenResetConfirmation(false);
            resetConversation();
          }}
          onCancel={() => this.setOpenResetConfirmation(false)}
        >
          WARNING: If you haven't saved the following ID:{' '}
          <span className={classes.userSelectable}>{conversationID}</span> you
          won't be able to access this conversation again<br />
          Are you sure that you want to reset the conversation ?
        </DialogConfirm>
      </React.Fragment>
    );
  }
}

SettingsButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired,
  resetConversation: PropTypes.func.isRequired,
  conversationID: PropTypes.string,
};

export default withStyles(styles)(SettingsButtons);
