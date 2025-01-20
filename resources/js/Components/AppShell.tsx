import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';

interface Studio {
  id: string;
  name: string;
}

interface User {
  name: string;
  selectedStudio: Studio;
  studios: Studio[];
}

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studioMenuAnchor, setStudioMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const user: User = {
    name: 'Jane Smith',
    selectedStudio: { id: '1', name: 'Ballet Academy' },
    studios: [
      { id: '1', name: 'Ballet Academy' },
      { id: '2', name: 'Modern Dance Studio' },
    ],
  };

  const navigationLinks = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Classes', icon: <ClassIcon /> },
    { name: 'Students', icon: <FaceIcon /> },
    { name: 'Events', icon: <CalendarTodayIcon /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: 'common.black',
          color: 'common.white',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
        >
          <ApplicationLogo />

          <Stack direction="row" spacing={2}>
            {isDesktop &&
              navigationLinks.map((link) => (
                <Button
                  key={link.name}
                  color="primary"
                  variant="outlined"
                  startIcon={link.icon}
                  sx={{
                    color: 'common.white',
                    borderColor: 'gray1.light',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {link.name}
                </Button>
              ))}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">{user.name}</Typography>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={(e) => setStudioMenuAnchor(e.currentTarget)}
                  sx={{ color: 'common.white' }}
                >
                  {user.selectedStudio.name}
                </Button>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  {user.name.charAt(0)}
                </Avatar>
              </Stack>
            </Box>

            {!isDesktop && (
              <IconButton
                edge="end"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: 'common.white' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: 'auto',
          bgcolor: 'common.black',
          color: 'common.white',
        }}
      >
        <Typography variant="body2" align="center">
          Copyright {new Date().getFullYear()} Simple Velocity DBA Experience
          Dance
        </Typography>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navigationLinks.map((link) => (
              <ListItemButton key={link}>
                <ListItemText primary={link} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Studio Selection Menu */}
      <Menu
        anchorEl={studioMenuAnchor}
        open={Boolean(studioMenuAnchor)}
        onClose={() => setStudioMenuAnchor(null)}
      >
        {user.studios.map((studio) => (
          <MenuItem
            key={studio.id}
            onClick={() => setStudioMenuAnchor(null)}
            selected={studio.id === user.selectedStudio.id}
          >
            {studio.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AppShell;
