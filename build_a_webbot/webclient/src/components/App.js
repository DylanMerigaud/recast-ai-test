import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import UserInput from "components/UserInput";
import Conversation from "components/Conversation";
import grey from "material-ui/colors/grey";
import blue from "material-ui/colors/blue";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      paper: grey[200],
      userMessage: blue[200]
    }
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      userMessage: blue[500]
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light"
    };
  }

  changeTheme() {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light"
    });
  }

  render() {
    const { classes } = this.props;
    const { theme } = this.state;
    return (
      <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <div className={classes.root}>
          <Conversation />
          <UserInput changeTheme={() => this.changeTheme()} />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(App);
