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

  const textColor = variant === 'dark' ? 'text.primary' : 'text.secondary';
  const borderColor =
    variant === 'dark' ? 'rgba(255, 255, 255, .3)' : 'rgba(0, 0, 0, .3)';
  const notchedOutlineStyles = {
    '.MuiOutlinedInput-notchedOutline': {
      borderRadius: 170,
      border: `1px solid ${borderColor}`,
      background: 'rgba(255, 255, 255, .1)',
    },
  };

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
            variant="outlined"
            notched={false}
            value={dateRange}
            aria-label="Date"
            onChange={(event: SelectChangeEvent<DateRangeOption>) => {
              setDateRange(event.target.value as DateRangeOption);
            }}
            sx={{
              color: textColor,
              '.MuiSelect-icon': { color: textColor },
              ...notchedOutlineStyles,
            }}
            IconComponent={ExpandMoreIcon}
            inputProps={{
              sx: {
                color: textColor,
              },
            }}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: { color: 'text.secondary' },
                },
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
        slotProps={{ paper: { sx: { color: 'text.secondary' } } }}
        sx={{
          color: textColor,
          '.MuiSelect-icon': { color: textColor },
          ...notchedOutlineStyles,
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter location..."
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
                sx: { color: textColor, border: 'none' },
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: textColor }}>
                    <SearchIcon color="inherit" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
