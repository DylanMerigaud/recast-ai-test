import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const styles = (theme) => ({
  root: {
    userSelect: 'none',
  },
  content: {
    margin: '10px',
  },
});

function DialogConfirm({
  classes,
  open,
  onConfirm,
  onCancel,
  children,
  title,
}) {
  if (open)
    return (
      <Dialog className={classes.root} open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.content}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    );
  else return null;
}

DialogConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
};

DialogConfirm.defaultProps = {
  open: true,
  title: 'Confirmation',
};

export default withStyles(styles)(DialogConfirm);
