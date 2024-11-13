import { FeaturedEvent } from '@/types/Events/FeaturedEvent';
import { keyframes, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import EventSearch from './EventSearch';

const marquee = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export interface HeroProps {
  featuredEvents: FeaturedEvent[];
}
const TARGET_FEATURED_EVENT_LENGTH = 100;

export default function Hero(props: HeroProps) {
  const expandedFeaturedEvents = useMemo(() => {
    const events = props.featuredEvents;
    if (events.length >= TARGET_FEATURED_EVENT_LENGTH) {
      return events.slice(0, TARGET_FEATURED_EVENT_LENGTH);
    }

    const repetitions = Math.ceil(TARGET_FEATURED_EVENT_LENGTH / events.length);
    const expanded = Array(repetitions)
      .fill(events)
      .flat()
      .slice(0, TARGET_FEATURED_EVENT_LENGTH);
    return expanded;
  }, [props.featuredEvents]);
  console.log(expandedFeaturedEvents);
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'url(/images/hero-1.jpg) top no-repeat',
        backgroundSize: 'cover',
        overflowY: 'auto',
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ color: 'primary', px: 4, maxWidth: 'md', flex: 1 }}
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
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            width: 'fit-content',
            animation: `${marquee} 3000s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused',
            },
          }}
        >
          {expandedFeaturedEvents != null
            ? expandedFeaturedEvents.map((fe, i) => (
              <Stack
                key={i}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '300px', flexShrink: 0, p: 2 }}
              >
                <Stack>
                  <Typography variant="body1">{fe.title}</Typography>
                  <Typography
                    variant="body2"
                    fontSize={(theme) => theme.typography.pxToRem(10)}
                  >
                    {fe.organization?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={(theme) => theme.typography.pxToRem(10)}
                  >
                    {fe.venueName}
                  </Typography>
                </Stack>
                <img
                  height="24px"
                  width="24px"
                  src="/images/logo-small.svg"
                />
              </Stack>
            ))
            : null}
        </Stack>
      </Stack>
    </Stack>
  );
}
