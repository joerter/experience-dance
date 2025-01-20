import { FeaturedEvent } from '@/types/Events/FeaturedEvent';
import { Link } from '@inertiajs/react';
import { Button, keyframes, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

const marquee = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export interface HeroProps {
  canRegister: boolean;
  featuredEvents: FeaturedEvent[];
}
const TARGET_FEATURED_EVENT_LENGTH = 100;

export default function Hero(props: HeroProps) {
  const expandedFeaturedEvents = useMemo(() => {
    const events = props.featuredEvents;
    if (!events.length) {
      return [];
    }
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
            color="common.white"
            textAlign="center"
            fontSize={(theme) => ({
              xs: theme.typography.pxToRem(64),
            })}
            fontWeight={(theme) => theme.typography.fontWeightRegular}
          >
            Transform More Lives Through Dance
          </Typography>
          <Typography
            color="gray1.light"
            variant="subtitle1"
            textAlign="center"
            fontSize={(theme) => ({
              xs: theme.typography.pxToRem(24),
            })}
          >
            Grow your studio and inspire the next generation of dancers
          </Typography>
        </Stack>
        {props.canRegister && (
          <Button variant="contained" color="primary" component={Link} href="/register">
            Create Your Free Account
          </Button>
        )}
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
