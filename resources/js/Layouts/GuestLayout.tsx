import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';
import { Container, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <Stack
      flexDirection="column"
      sx={{ minHeight: '100vh', bgcolor: 'common.black' }}
    >
      <Container maxWidth="sm" sx={{ flex: 1 }}>
        <Stack
          flexDirection="column"
          alignItems="center"
          sx={{ width: '100%', py: 8 }}
          spacing={4}
        >
          <Link href="/">
            <ApplicationLogo width="160px" height="44px" />
          </Link>

          {children}
        </Stack>
      </Container>

      <Footer />
    </Stack>
  );
}
