import NearMeIcon from '@mui/icons-material/NearMe';
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
export default function Hero() {
  return (
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
          <Typography
            variant="h1"
            textAlign="center"
            fontSize={(theme) => theme.typography.pxToRem(100)}
            fontWeight={(theme) => theme.typography.fontWeightRegular}
          >
            Find Dance Events Near You.
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            fontSize={(theme) => theme.typography.pxToRem(24)}
          >
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
  );
}
