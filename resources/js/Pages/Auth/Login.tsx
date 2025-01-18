import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { FormEventHandler } from 'react';

function ChooseLoginMethod() {
  return (
    <Stack spacing={4}>
      <Stack>
        <Typography
          variant="h5"
          align="center"
          color="secondary"
          sx={{ mb: 2 }}
        >
          Choose Login Method
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Welcome back! Please choose a login method below.
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Don't have an account yet?{' '}
          <Link href={route('register')}>
            Register for your free account here
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          startIcon={<EmailIcon />}
          component={Link}
          href={route('login', { method: 'email' })}
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
    </Stack>
  );
}

export default function Login({
  status,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { url } = usePage();
  const searchParams = new URLSearchParams(
    new URL(url, window.location.origin).search,
  );
  const isEmailLoginMethod = searchParams.get('method') === 'email';
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <Paper sx={{ width: '100%', px: 2, py: 4 }}>
        {isEmailLoginMethod ? null : <ChooseLoginMethod />}
      </Paper>
    </GuestLayout>
  );
}
