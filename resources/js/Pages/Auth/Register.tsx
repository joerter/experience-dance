import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
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

function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  const handleGoogleLogin = () => {
    window.location.href = route('auth.google.redirect');
  };

  return (
    <Container maxWidth="sm" sx={{ pt: '140px', pb: 10 }}>
      <Head title="Register" />

      <form onSubmit={submit}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Stack>
          <Paper sx={{ px: 4, py: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              color="textSecondary"
            >
              Register for Experience Dance
            </Typography>
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Stack>
      </form>
    </Container>
  );
}

Register.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <GuestLayout children={page}></GuestLayout>;

export default Register;
