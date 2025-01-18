import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';
import { Container, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <Stack
      flexDirection="column"
      sx={{ minHeight: '100vh' }}
    >
      <Container maxWidth="sm">
        <Stack
          flexDirection="column"
          alignItems="center"
          sx={{ flex: 1, width: '100%', pt: 8 }}
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
