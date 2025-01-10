import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import EventSearch from './EventSearch';
import EventsMap from './EventsMap';

const events: {
  name: string;
  date: string;
  time: string;
  organization: string;
  location: string;
}[] = [
    {
      name: 'The Long Black Veil',
      date: 'October 20th, 2024',
      time: '8:00 PM',
      organization: 'New England Ballet Theatre',
      location: 'West Hartford, CT',
    },
    {
      name: 'The Fantastic Toy Shop',
      date: 'December 20th, 2024',
      time: '8:00 PM',
      organization: 'New England Ballet Theatre',
      location: 'West Hartford, CT',
    },
    {
      name: 'Emerging Works',
      date: 'March 20th, 2024',
      time: '8:00 PM',
      organization: 'New England Ballet Theatre',
      location: 'West Hartford, CT',
    },
    {
      name: 'La Sylphide',
      date: 'June 20th, 2024',
      time: '8:00 PM',
      organization: 'New England Ballet Theatre',
      location: 'West Hartford, CT',
    },
  ];

export default function Events() {
  const [mapViewEnabled, setMapViewEnabled] = useState(false);
  const theme = useTheme();
  const isLargeBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Stack sx={{ p: 4, backgroundColor: 'common.white' }}>
      <Container maxWidth="lg">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" color="textSecondary" sx={{ m: 2 }}>
            Events
          </Typography>
          <FormControlLabel
            slotProps={{ typography: { color: 'textSecondary' } }}
            control={
              <Switch
                checked={mapViewEnabled}
                onChange={() => {
                  setMapViewEnabled((prev) => !prev);
                }}
              />
            }
            label="View Map"
            sx={{ display: { xs: 'block', lg: 'none' } }}
          />
        </Stack>

        <EventSearch
          variant="light"
          onSuggestionSelected={(suggestion: any) => {
            console.log('selected', suggestion);
          }}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="flex-start"
          sx={{ mt: 2 }}
        >
          <Stack
            sx={{
              display: { xs: mapViewEnabled ? 'none' : 'flex', lg: 'flex' },
              flexBasis: { xs: '100%', lg: '50%' },
            }}
          >
            {events.map((e, i, arr) => (
              <div key={i}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    border: 'none',
                    m: 2,
                  }}
                  variant="outlined"
                >
                  <CardMedia
                    component="img"
                    sx={{ width: '160px', height: '160px' }}
                    image="images/logo-small.svg"
                  ></CardMedia>
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flex: 1,
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                    }}
                  >
                    <Stack spacing={4}>
                      <Stack>
                        <Typography
                          variant="body1"
                          fontSize={(theme) => theme.typography.pxToRem(16)}
                          color="secondary"
                        >
                          {e.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontSize={(theme) => theme.typography.pxToRem(14)}
                          sx={{ color: 'gray4.main' }}
                        >
                          {e.date} | {e.time}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontSize={(theme) => theme.typography.pxToRem(14)}
                          sx={{ color: 'gray4.main' }}
                        >
                          {e.location}
                        </Typography>
                      </Stack>

                      <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
                        View Details
                      </Button>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <IconButton size="small">
                        <TurnedInNotIcon />
                      </IconButton>
                      <IconButton size="small">
                        <CalendarTodayIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
                {i !== arr.length - 1 ? <Divider /> : null}
              </div>
            ))}
          </Stack>
          <Stack
            sx={{
              display: { xs: mapViewEnabled ? 'flex' : 'none', lg: 'flex' },
              flexBasis: { xs: '100%', lg: '50%' },
            }}
          >
            {mapViewEnabled || isLargeBreakpoint ? <EventsMap /> : null}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
