import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return  (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
            <CircularProgress />

    </Box>
  );
}
