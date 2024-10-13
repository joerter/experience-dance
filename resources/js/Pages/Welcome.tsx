import NavBar from '@/Components/NavBar';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { Box } from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Box sx={{ height: '500px', background: 'black' }}>
      </Box>
    </>
  );
}

Welcome.layout = (page: ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>) => (
  <BaseLayout children={page}>
  </BaseLayout>
)

export default Welcome
