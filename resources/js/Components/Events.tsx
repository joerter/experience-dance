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
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
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
  return (
    <Stack sx={{ p: 4, backgroundColor: 'common.white' }}>
      <Container maxWidth="lg">
        <Typography variant="h1" color="textSecondary" sx={{ m: 2 }}>
          Events
        </Typography>

        <EventSearch variant="light" />
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="flex-start"
          sx={{ mt: 2 }}
        >
          <Stack sx={{ flexBasis: { xs: '100%', lg: '50%' } }}>
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
              display: { xs: 'none', lg: 'flex' },
              flexBasis: { xs: '100%', lg: '50%' },
            }}
          >
            <EventsMap />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}