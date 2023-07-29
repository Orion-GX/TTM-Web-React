import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';
interface LoadingProps {
  loading: boolean;
  handleChange?: () => any;
}

export default function LoadingBackdrop(props: LoadingProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
        onClick={props.handleChange}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
