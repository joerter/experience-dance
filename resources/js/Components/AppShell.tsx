import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studioMenuAnchor, setStudioMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  // Mock user data - replace with actual user context/data
  const user: User = {
    name: 'Jane Smith',
    selectedStudio: { id: '1', name: 'Ballet Academy' },
    studios: [
      { id: '1', name: 'Ballet Academy' },
      { id: '2', name: 'Modern Dance Studio' },
    ],
  };

  const navigationLinks = ['Dashboard', 'Classes', 'Students', 'Events'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* App Bar */}
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'gray3.main',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          {/* Left section - Logo */}
          <ApplicationLogo />

          {/* Middle section - Navigation */}
          {!isMobile && (
            <ButtonGroup variant="text" sx={{ mx: 4 }}>
              {navigationLinks.map((link) => (
                <Button
                  key={link}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'gray3.light',
                    },
                  }}
                >
                  {link}
                </Button>
              ))}
            </ButtonGroup>
          )}

          {/* Right section - User info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">{user.name}</Typography>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={(e) => setStudioMenuAnchor(e.currentTarget)}
                  sx={{ color: 'text.primary' }}
                >
                  {user.selectedStudio.name}
                </Button>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  {user.name.charAt(0)}
                </Avatar>
              </Stack>
            </Box>

            {isMobile && (
              <IconButton
                edge="end"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </AppBar>

      {/* Main content */}
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

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: 'auto',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'gray3.main',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright 2025 Simple Velocity DBA Experience Dance
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
