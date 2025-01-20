import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Container, Paper, Stack, Typography } from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function AwaitRegisterToken() {
  return (
    <Container maxWidth="sm" sx={{ pt: '140px', pb: 10 }}>
      <Head title="Complete Registration" />

      <Paper sx={{ width: '100%', px: 2, py: 4 }}>
        <Stack spacing={4}>
          <Typography
            variant="h5"
            align="center"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Complete Registration
          </Typography>
          <Typography variant="body1" align="center" color="secondary">
            We sent an email with a secure link. Use the link to complete your registration.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

AwaitRegisterToken.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <GuestLayout children={page}></GuestLayout>;

export default AwaitRegisterToken;
