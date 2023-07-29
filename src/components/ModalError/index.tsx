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
import { Box } from '@mui/material';

interface ModalDialogProps {
  description?: string;
  open: boolean;
  handleClose: () => any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalError(props: ModalDialogProps) {
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
          {FAILED_TRANSACTION_TEXT}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '400px',
              alignItems: 'center'
            }}
          >
            <Button
              fullWidth
              sx={{ maxWidth: '150px' }}
              variant="contained"
              color="error"
              style={{ fontSize: '22px' }}
              onClick={props.handleClose}
            >
              {COMFIRM_BUTTON_TEXT}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
