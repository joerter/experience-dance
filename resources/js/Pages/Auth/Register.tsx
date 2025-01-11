import BaseLayout from '@/Layouts/BaseLayout';
import { Head, useForm } from '@inertiajs/react';
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
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <Container maxWidth="sm" sx={{ pt: '140px', pb: 10 }}>
      <Head title="Register" />

      <form onSubmit={submit}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
) => <BaseLayout children={page}></BaseLayout>;

export default Register;
