import React from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import LightbulbOutline from "@material-ui/icons/LightbulbOutline";
import SettingsBackupRestore from "@material-ui/icons/SettingsBackupRestore";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {}
});

function SettingsButtons({ classes, changeTheme, resetConversation }) {
  return (
    <React.Fragment>
      <Tooltip title="Change theme" placement="left">
        <IconButton onClick={changeTheme}>
          <LightbulbOutline />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset conversation" placement="left">
        <IconButton onClick={resetConversation}>
          <SettingsBackupRestore />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

SettingsButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired,
  resetConversation: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsButtons);
