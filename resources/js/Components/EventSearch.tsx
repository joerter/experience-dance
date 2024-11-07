import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

enum DateRangeOption {
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export default function EventSearch({
  variant,
}: {
  variant: 'dark' | 'light';
}) {
  const [dateRange, setDateRange] = useState<DateRangeOption>(
    DateRangeOption.Week,
  );

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
      sx={{ width: '100%' }}
      spacing={2}
    >
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <FormControl size="small">
          <Select
            id="event-date-selector"
            value={dateRange}
            aria-label="Date"
            onChange={(event: SelectChangeEvent<DateRangeOption>) => {
              setDateRange(event.target.value as DateRangeOption);
            }}
            sx={{
              color: 'text.primary',
              '.MuiSelect-icon': { color: 'text.primary' },
            }}
            IconComponent={ExpandMoreIcon}
            inputProps={{
              sx: {
                color: 'text.primary',
                borderRadius: 170,
                border: '1px solid rgba(255, 255, 255, .3)',
                background: 'rgba(255, 255, 255, .1)',
              },
            }}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Autocomplete
        id="location"
        disableClearable
        freeSolo
        fullWidth
        options={['Hartford', 'Omaha']}
        sx={{
          color: 'text.primary',
          borderRadius: 170,
          border: '1px solid rgba(255, 255, 255, .3)',
          background: 'rgba(255, 255, 255, .1)',
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter location..."
            variant="standard"
            slotProps={{
              input: {
                sx: { color: 'text.primary', border: 'none' },
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: 'text.primary' }}>
                    <SearchIcon color="inherit" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              py: 1,
              px: 2,
            }}
          />
        )}
      />
    </Stack>
  );
}
