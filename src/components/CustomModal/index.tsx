import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  CANCEL_BUTTON_TEXT,
  COMFIRM_BUTTON_TEXT,
  FAILED_TRANSACTION_TEXT
} from 'src/constants';
import { Box, Grid } from '@mui/material';

interface ModalDialogProps {
  title?: string;
  description?: string;
  open: boolean;
  confirmButton: boolean;
  cancelButton: boolean;
  handleConfirm?: () => any;
  handleClose?: () => any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCustom(props: ModalDialogProps) {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign="center" fontSize="26px">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            textAlign="center"
            fontSize="20px"
            id="alert-dialog-slide-error-description"
            style={{ marginBottom: '20px' }}
          >
            {props.description}
          </DialogContentText>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '400px',
              alignItems: 'center'
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Button
                fullWidth
                // sx={{ maxWidth: '150px' }}
                variant="contained"
                color="success"
                style={{ fontSize: '22px' }}
                onClick={props.handleConfirm}
              >
                {COMFIRM_BUTTON_TEXT}
              </Button>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Button
                fullWidth
                // sx={{ maxWidth: '150px' }}
                variant="contained"
                color="error"
                style={{ fontSize: '22px' }}
                onClick={props.handleClose}
              >
                {CANCEL_BUTTON_TEXT}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
