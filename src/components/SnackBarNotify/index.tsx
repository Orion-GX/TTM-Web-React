import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';
import { Alert } from '@mui/material';
interface SnackBarProps {
  message?: string;
  type: string;
  open: boolean;
  handleChange?: () => any;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarNotify(props: SnackBarProps) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={4000}
        open={props.open}
        onClose={props.handleChange}
        TransitionComponent={SlideTransition}
        key="Slide transition"
      >
        {props.type == 'success' ? (
          <Alert
            variant="filled"
            onClose={props.handleChange}
            severity="success"
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        ) : props.type == 'error' ? (
          <Alert
            variant="filled"
            onClose={props.handleChange}
            severity="error"
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        ) : props.type == 'info' ? (
          <Alert
            variant="filled"
            onClose={props.handleChange}
            severity="info"
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        ) : (
          <Alert
            variant="filled"
            onClose={props.handleChange}
            severity="success"
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
