import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEventHandler } from 'react';
import { LoginMethods } from './LoginMethods';

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
      <LoginMethods hrefs={{ email: route('login', { method: 'email' }) }} />
    </Stack>
  );
}

function EmailMethod() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <Stack spacing={4}>
      <Stack>
        <Typography
          variant="h5"
          align="center"
          color="secondary"
          sx={{ mb: 2 }}
        >
          Email Login
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Please enter your email address below to receive a secure login link.
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Don't have an account yet?{' '}
          <Link href={route('register')}>
            Register for your free account here
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <form onSubmit={submit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              autoFocus
              required
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={processing}
            >
              {processing ? 'Sending...' : 'Send Login Link'}
            </Button>
          </Stack>
        </form>
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

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <Typography variant="body1" color="success">
          {status}
        </Typography>
      )}

      <Paper sx={{ width: '100%', px: 2, py: 4 }}>
        {isEmailLoginMethod ? <EmailMethod /> : <ChooseLoginMethod />}
      </Paper>
    </GuestLayout>
  );
}
