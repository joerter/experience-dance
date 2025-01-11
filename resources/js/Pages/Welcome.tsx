import Events from '@/Components/Events';
import Hero from '@/Components/Hero';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { FeaturedEvent } from '@/types/Events/FeaturedEvent';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function Welcome({
  auth,
  canLogin,
  canRegister,
  featuredEventsData,
  showEventAndOrgSearch,
}: PageProps<{
  canLogin: boolean;
  canRegister: boolean;
  featuredEventsData: { data: FeaturedEvent[] };
  showEventAndOrgSearch: boolean;
}>) {
  return (
    <>
      <Head title="Welcome"></Head>
      <Box>
        <Hero
          canRegister={canRegister}
          featuredEvents={featuredEventsData.data}
        />
        {showEventAndOrgSearch && <Events />}
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
