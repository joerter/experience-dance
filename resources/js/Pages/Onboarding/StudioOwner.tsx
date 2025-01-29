import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const StudioInformation = ({
  timezones,
}: {
  timezones: Record<string, string>;
}) => {
  const { data, setData, post, processing, errors } = useForm({
    studio_name: '',
    phone: '',
    street_line_1: '',
    street_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    website: '',
    timezone: 'America/New_York',
  });

  function handleChange(e: any) {
    const key = e.target.name;
    const value = e.target.value;
    setData((values) => ({
      ...values,
      [key]: value,
    }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('onboarding.studio.store'));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Welcome to Experience Dance!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        In order to get started, please provide us with some basic information
        about your studio.
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <TextField
              required
              fullWidth
              label="Studio Name"
              name="studio_name"
              value={data.studio_name}
              onChange={handleChange}
              error={!!errors.studio_name}
              helperText={errors.studio_name}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone (optional)"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Website (optional)"
              name="website"
              value={data.website}
              onChange={handleChange}
              error={!!errors.website}
              helperText={errors.website}
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              required
              fullWidth
              label="Street Address Line 1"
              name="street_line_1"
              value={data.street_line_1}
              onChange={handleChange}
              error={!!errors.street_line_1}
              helperText={errors.street_line_1}
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Street Address Line 2 (optional)"
              name="street_line_2"
              value={data.street_line_2}
              onChange={handleChange}
              error={!!errors.street_line_2}
              helperText={errors.street_line_2}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={data.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={data.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField
              required
              fullWidth
              label="ZIP Code"
              name="postal_code"
              value={data.postal_code}
              onChange={handleChange}
              error={!!errors.postal_code}
              helperText={errors.postal_code}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="timezone-select-label">Time Zone</InputLabel>
              <Select
                labelId="timezone-select-label"
                id="timezone-select"
                name="timezone"
                value={data.timezone}
                label="Time Zone"
                onChange={handleChange}
              >
                {Object.entries(timezones).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={processing}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default function StudioOwner({
  timezones,
}: PageProps<{ timezones: Record<string, string> }>) {
  return (
    <AuthenticatedLayout>
      <Head title="Studio Onboarding" />
      <StudioInformation timezones={timezones} />
    </AuthenticatedLayout>
  );
}
