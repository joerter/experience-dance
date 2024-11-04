import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
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
    <Stack sx={{ p: 4, backgroundColor: 'common.white', height: '1000px' }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="flex-start"
        >
          <Stack flexBasis="50%">
            <Typography variant="h1" color="textSecondary">
              Events
            </Typography>
            <EventSearch variant="light" />

            {events.map((e, i, arr) => (
              <>
                <Card
                  sx={{ display: 'flex', border: 'none', m: 2 }}
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

                      <Button variant="text" endIcon={<ArrowForwardIcon />}>
                        View Details
                      </Button>
                    </Stack>
                    <Stack></Stack>
                  </CardContent>
                </Card>
                {i !== arr.length - 1 ? <Divider /> : null}
              </>
            ))}
          </Stack>
          <Stack flexBasis="50%">
            <EventsMap />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
