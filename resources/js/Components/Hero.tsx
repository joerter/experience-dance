import { Stack, Typography } from '@mui/material';
import EventSearch from './EventSearch';

export default function Hero() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', background: 'black' }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ color: 'primary', px: 4, maxWidth: 'md' }}
        spacing={4}
      >
        <Stack spacing={2}>
          <Typography
            variant="h1"
            textAlign="center"
            fontSize={(theme) => ({
              xs: theme.typography.pxToRem(32),
              sm: theme.typography.pxToRem(64),
              md: theme.typography.pxToRem(84),
              lg: theme.typography.pxToRem(100),
            })}
            fontWeight={(theme) => theme.typography.fontWeightRegular}
          >
            Find Dance Events Near You.
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            fontSize={(theme) => ({
              xs: theme.typography.pxToRem(16),
              sm: theme.typography.pxToRem(32),
            })}
          >
            Your gateway to an immersive dance experience
          </Typography>
        </Stack>
        <EventSearch variant="dark" />
      </Stack>
    </Stack>
  );
}
