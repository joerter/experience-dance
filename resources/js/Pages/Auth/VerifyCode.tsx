import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEventHandler } from 'react';

export default function VerifyCode({
  status,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors } = useForm({
    code: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login.verify.code'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <Paper sx={{ width: '100%', px: 2, py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center" color="secondary">
              Complete Login
            </Typography>
            <Typography variant="body1" align="center">
              We sent a secure link and code to your email. Click the link, or
              enter the code here to complete login.
            </Typography>
            <Typography variant="body1" align="center" color="secondary">
              Didn't receive the email?{' '}
              <Link href={route('register')}>
                Register for your free account here
              </Link>
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <form onSubmit={submit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="Code"
                  type="code"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  required
                  value={data.code}
                  onChange={(e) => setData('code', e.target.value)}
                  error={!!errors.code}
                  helperText={errors.code}
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
      </Paper>
    </GuestLayout>
  );
}
