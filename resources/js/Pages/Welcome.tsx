import Events from '@/Components/Events';
import Hero from '@/Components/Hero';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome"></Head>
      <Box>
        <Hero />
        <Events />
      </Box>
    </>
  );
}

Welcome.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <BaseLayout children={page}></BaseLayout>;

export default Welcome;
