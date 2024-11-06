import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
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
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        borderRadius: 170,
        border: '1px solid rgba(255, 255, 255, .3)',
        background: 'rgba(255, 255, 255, .1)',
        width: '100%',
      }}
    >
      <Autocomplete
        id="location"
        freeSolo
        options={['Hartford', 'Omaha']}
        sx={{ flexBasis: '70%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter location..."
            sx={{ border: 'none' }}
          />
        )}
      />
      <Divider variant="middle" orientation="vertical" />

      <FormControl sx={{ flexBasis: '25%' }}>
        <InputLabel id="event-date-selector-label">Date</InputLabel>

        <Select
          labelId="event-date-selector-label"
          id="event-date-selector"
          value={dateRange}
          label="Age"
          onChange={(event: SelectChangeEvent<DateRangeOption>) => {
            setDateRange(event.target.value as DateRangeOption);
          }}
        >
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="year">This Year</MenuItem>
        </Select>
      </FormControl>

      <IconButton size="large" sx={{ flexBasis: '5%' }}>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}
