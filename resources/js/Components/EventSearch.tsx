import NearMeIcon from '@mui/icons-material/NearMe';
import { Autocomplete, Button, TextField } from '@mui/material';

export default function EventSearch({
  variant,
}: {
  variant: 'dark' | 'light';
}) {
  return (
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
  );
}
