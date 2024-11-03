import { Container, Stack, Typography } from '@mui/material';
import EventSearch from './EventSearch';
import EventsMap from './EventsMap';

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
          </Stack>
          <Stack flexBasis="50%">
            <EventsMap />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
