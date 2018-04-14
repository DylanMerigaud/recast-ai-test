import Dialog from "material-ui/Dialog";
import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    userSelect: "none"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px"
  }
});

function DialogConversationRetrieve({
  classes,
  open,
  value,
  onChange,
  onSubmit
}) {
  if (open)
    return (
      <Dialog className={classes.root} open={open}>
        <form
          className={classes.content}
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Typography variant="display1" gutterBottom>
            Retrieve conversation
          </Typography>
          <TextField
            placeholder="Existing conversation Id"
            helperText="Only if you have one"
            margin="normal"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
          <Button type="submit">
            {!value
              ? "Create a new conversation"
              : "Retrieve the existing conversation"}
          </Button>
        </form>
      </Dialog>
    );
  else return null;
}

DialogConversationRetrieve.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

DialogConversationRetrieve.defaultProps = {
  open: true
};

export default withStyles(styles)(DialogConversationRetrieve);
