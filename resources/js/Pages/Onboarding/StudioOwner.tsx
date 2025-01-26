import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Grid2, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const StudioOnboardingForm = () => {
  const [formData, setFormData] = useState({
    studioName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    primaryDanceStyle: '',
    studentCapacity: '',
    numberOfTeachers: '',
    businessType: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Welcome to Experience Dance
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Let's get your studio set up
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 size={8}>
            <TextField
              required
              fullWidth
              label="Studio Name"
              name="studioName"
              value={formData.studioName}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              required
              fullWidth
              label="Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField
              required
              fullWidth
              label="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Create Studio Profile
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default function StudioOwner() {
  return (
    <AuthenticatedLayout>
      <Head title="Studio Onboarding" />
      <StudioOnboardingForm />
    </AuthenticatedLayout>
  );
}
