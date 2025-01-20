import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  FormEventHandler,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react';
import { LoginMethods } from './LoginMethods';

function EmailMethod() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'));
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
          Register with Email
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Please enter your name and email address below to create your account.
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
              {processing ? 'Registering...' : 'Register'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}

function ChooseRegisterMethod() {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" color="secondary" sx={{ mb: 2 }}>
        Choose Register Method
      </Typography>
      <Typography variant="body1" align="center" color="secondary">
        Choose how you want to create your account on Experience Dance.
      </Typography>
      <Stack>
        <LoginMethods
          hrefs={{ email: route('register', { method: 'email' }) }}
        />
      </Stack>
    </Stack>
  );
}

function Register() {
  const { url } = usePage();
  const searchParams = new URLSearchParams(
    new URL(url, window.location.origin).search,
  );
  const isEmailRegisterMethod = searchParams.get('method') === 'email';

  const handleGoogleLogin = () => {
    window.location.href = route('auth.google.redirect');
  };

  return (
    <Container maxWidth="sm" sx={{ pt: '140px', pb: 10 }}>
      <Head title="Register" />

      <Paper sx={{ width: '100%', px: 2, py: 4 }}>
        {isEmailRegisterMethod ? <EmailMethod /> : <ChooseRegisterMethod />}
      </Paper>
    </Container>
  );
}

Register.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <GuestLayout children={page}></GuestLayout>;

export default Register;
