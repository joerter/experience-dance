import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Events', href: '/events' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
];

function HamburgerIcon({ sideNavIsOpen }: { sideNavIsOpen: boolean }) {
  const theme = useTheme();
  const lineStyles = {
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
    transformOrigin: 'center center',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={24}
      width={24}
      strokeWidth={2}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...lineStyles,
        transform: sideNavIsOpen ? 'rotate(180deg)' : 'none',
      }}
    >
      <path
        d="M4 6h16"
        style={{
          ...lineStyles,
          transform: sideNavIsOpen
            ? 'translate(-4px, 4px) rotate(45deg)'
            : 'none',
        }}
      />
      <path
        d="M12 12h8"
        style={{
          ...lineStyles,
          opacity: sideNavIsOpen ? 0 : 1,
        }}
      />
      <path
        d="M4 18h16"
        style={{
          ...lineStyles,
          transform: sideNavIsOpen
            ? 'translate(-4px, -4px) rotate(-45deg)'
            : 'none',
        }}
      />
    </svg>
  );
}

function SideNav({ onToggleSideNav }: { onToggleSideNav: () => void }) {
  return (
    <Box onClick={onToggleSideNav} sx={{ px: 6 }}>
      <List>
        {navItems.map((item, i) => (
          <ListItem
            key={i}
            disablePadding
            sx={{ borderBottom: 1, borderColor: 'primary.main' }}
          >
            <ListItemButton sx={{ textAlign: 'center' }} href={item.href}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function NavBar() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleToggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <img width="160px" height="44px" src="/images/logo-white.svg" />
          <Stack
            direction="row"
            spacing={2}
            sx={(theme) => ({
              p: 2,
              border: `1px solid ${theme.palette.gray2.main}`,
              borderRadius: '30px',
              display: { xs: 'none', lg: 'flex' },
            })}
          >
            {navItems.map((item, i) => (
              <Button key={i} color="inherit" variant="outlined">
                {item.text}
              </Button>
            ))}
          </Stack>
          <Stack sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Button
              color="inherit"
              variant="outlined"
              sx={{ fontWeight: '600' }}
            >
              Submit Event
            </Button>
          </Stack>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { xs: 'block', lg: 'none' } }}
            onClick={() => {
              handleToggleSideNav();
            }}
          >
            <HamburgerIcon sideNavIsOpen={sideNavOpen} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={sideNavOpen}
        onClose={() => {
          handleToggleSideNav();
        }}
        PaperProps={{ sx: { background: 'black', color: 'white' } }}
      >
        <SideNav onToggleSideNav={handleToggleSideNav} />
      </Drawer>
    </Box>
  );
}
