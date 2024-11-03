import EventSearch from '@/Components/EventSearch';
import Hero from '@/Components/Hero';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { Box, Container, Stack, Typography } from '@mui/material';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';

declare global {
  interface Window {
    L: any;
  }
}

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

  useEffect(() => {
    const map = window.L.map('map').setView([51.505, -0.09], 13);
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }, []);

  return (
    <Box>
      <Hero />
      <Stack sx={{ p: 4, backgroundColor: 'common.white', height: '1000px' }}>
        <Container maxWidth="md">
          <Stack
            direction="row"
            justifyContent="center"
            alignContent="flex-start"
          >
            <Stack>
              <Typography variant="h1" color="textSecondary">
                Events
              </Typography>
              <EventSearch variant="light" />
            </Stack>
            <Stack>
              <div id="map" style={{ height: '1000px', width: '500px' }}></div>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Box>
  );
}

Welcome.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <BaseLayout children={page}></BaseLayout>;

export default Welcome;
