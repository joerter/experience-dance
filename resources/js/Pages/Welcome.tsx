import EventSearch from '@/Components/EventSearch';
import Hero from '@/Components/Hero';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { Box, Container, Stack, Typography } from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <Box>
      <Hero />
      <Stack sx={{ p: 4, backgroundColor: 'common.white' }}>
        <Container maxWidth="md">
          <Typography variant="h1" color="textSecondary">
            Events
          </Typography>
          <EventSearch variant="light" />
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
