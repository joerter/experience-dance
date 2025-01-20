import { Link } from '@inertiajs/react';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack } from '@mui/material';

export function LoginMethods(props: { hrefs: { email: string } }) {
  return (
    <Stack spacing={2}>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        startIcon={<EmailIcon />}
        component={Link}
        href={props.hrefs.email}
      >
        Email
      </Button>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Google
      </Button>
    </Stack>
  );
}
