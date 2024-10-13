import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import NearMeIcon from '@mui/icons-material/NearMe';
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh', background: 'black' }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ color: 'primary', px: 4, maxWidth: 'md' }}
          spacing={4}
        >
          <Stack spacing={2}>
            <Typography variant="h1" textAlign="center">
              Find Dance Events Near You.
            </Typography>
            <Typography variant="body1" textAlign="center">
              Your gateway to an immersive dance experience
            </Typography>
          </Stack>
          <Autocomplete
            id="location"
            freeSolo
            fullWidth
            options={['Hartford', 'Omaha']}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Enter location..."
                slotProps={{
                  input: {
                    startAdornment: <NearMeIcon />,
                    endAdornment: <Button>Search</Button>,
                    sx: {
                      borderRadius: 170,
                      border: '1px solid rgba(255, 255, 255, .3)',
                      background: 'rgba(255, 255, 255, .1)',
                    },
                  },
                }}
              />
            )}
          />
        </Stack>
      </Stack>
    </>
  );
}

Welcome.layout = (
  page:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>,
) => <BaseLayout children={page}></BaseLayout>;

export default Welcome;
