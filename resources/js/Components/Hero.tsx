import { keyframes, Stack, Typography } from '@mui/material';
import EventSearch from './EventSearch';

const featuredEvents: {
  name: string;
  organization: string;
  location: string;
}[] = [
  {
    name: 'The Long Black Veil',
    organization: 'New England Ballet Theatre',
    location: 'West Hartford, CT',
  },
  {
    name: 'The Fantastic Toy Shop',
    organization: 'New England Ballet Theatre',
    location: 'West Hartford, CT',
  },
  {
    name: 'Emerging Works',
    organization: 'New England Ballet Theatre',
    location: 'West Hartford, CT',
  },
  {
    name: 'La Sylphide',
    organization: 'New England Ballet Theatre',
    location: 'West Hartford, CT',
  },
];

const marquee = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

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

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          animation: `${marquee} 60s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {featuredEvents.map((fe) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '300px', p: 2 }}
          >
            <Stack>
              <Typography variant="body1">{fe.name}</Typography>
              <Typography
                variant="body2"
                fontSize={(theme) => theme.typography.pxToRem(10)}
              >
                {fe.organization}
              </Typography>
              <Typography
                variant="body2"
                fontSize={(theme) => theme.typography.pxToRem(10)}
              >
                {fe.location}
              </Typography>
            </Stack>
            <img height="24px" width="24px" src="/images/logo-small.svg" />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
