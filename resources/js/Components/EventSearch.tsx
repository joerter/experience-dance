import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  debounce,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

enum DateRangeOption {
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

async function getSuggestedResults(request: any, callback: any) {
  try {
    console.log('make the request with', request);
    const response = await fetch(
      `/api/event-search?query=${encodeURIComponent(request)}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (!response.ok) throw new Error('Search failed');

    const data = await response.json();
    console.log('Got response: ', data);
    callback([]);
  } catch (error: any) {
    console.error('failed to search', error);
    callback([]);
  }
}

export default function EventSearch({
  variant,
}: {
  variant: 'dark' | 'light';
}) {
  const [value, setValue] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly any[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeOption>(
    DateRangeOption.Week,
  );

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly any[]) => void,
        ) => {
          getSuggestedResults(request, callback);
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly any[]) => {
      if (active) {
        let newOptions: readonly any[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

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
        options={options}
        autoComplete
        getOptionLabel={(option: any) =>
          typeof option === 'string' ? option : option.description
        }
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        slotProps={{ paper: { sx: { color: 'text.secondary' } } }}
        filterOptions={(x) => x}
        onChange={(event: any, newValue: any | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
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
