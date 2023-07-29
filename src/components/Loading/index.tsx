import { Box, LinearProgress } from '@mui/material';
interface LoadingProps {
  loading: boolean;
}

function Loading(props: LoadingProps) {
  return (
    <>
      {props.loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default Loading;
