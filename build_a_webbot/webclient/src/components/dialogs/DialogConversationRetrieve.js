import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const styles = (theme) => ({
  root: {
    userSelect: 'none',
  },
  content: {
    padding: '20px',
  },
});

function DialogConversationRetrieve({
  classes,
  open,
  value,
  onChange,
  onSubmit,
}) {
  if (open)
    return (
      <Dialog className={classes.root} open={open}>
        <form
          className={classes.content}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <DialogTitle>Retrieve conversation</DialogTitle>
          <DialogContent>
            <TextField
              placeholder="Existing conversation Id"
              helperText="Only if you have one"
              margin="normal"
              value={value}
              fullWidth
              onChange={(e) => onChange(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">{!value ? 'Create' : 'Retrieve'}</Button>
          </DialogActions>
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
  onSubmit: PropTypes.func.isRequired,
};

DialogConversationRetrieve.defaultProps = {
  open: true,
};

export default withStyles(styles)(DialogConversationRetrieve);
