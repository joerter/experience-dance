import {
  AppBar,
  Box,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        sx={{ pb: 10, display: { xs: 'none', md: 'flex' } }}
        spacing={5}
      >
        <Stack sx={{ pl: 3, pt: 10 }}>
          <Stack spacing={6}>
            <img width="160px" height="44px" src="/images/logo-white.svg" />
            <Typography variant="h3">
              Find Your Next Dance Experience
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <img src="/images/arrow-large.svg" />
        </Box>
      </Stack>
      <Box sx={{ px: 3 }}>
        <Divider sx={{ bgcolor: 'gray3.main', opacity: 0.2 }} />
      </Box>
      <AppBar
        position="relative"
        color="transparent"
        sx={{ boxShadow: 'none' }}
      >
        <Toolbar>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">
              ©{year} Simple Velocity, LLC DBA Experience Dance All rights reserved
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
