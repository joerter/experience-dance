import { Link, usePage } from '@inertiajs/react';
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
    <Stack spacing={2} onClick={onToggleSideNav} sx={{ px: 6 }}>
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
      <Button
        color="primary"
        variant="contained"
        sx={{ fontWeight: '600' }}
        component={Link}
        href={route('login.show')}
      >
        Sign In
      </Button>
    </Stack>
  );
}

export default function NavBar() {
  const { url } = usePage();
  const pathname = new URL(url, window.location.origin).pathname;
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleToggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        position: 'absolute',
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
              borderRadius: '30px',
              display: { xs: 'none', lg: 'flex' },
            })}
          >
            {navItems.map((item, i) => (
              <Button
                key={i}
                color="primary"
                variant={pathname === item.href ? 'contained' : 'outlined'}
                sx={{
                  color: 'common.white',
                  borderColor: 'gray1.light',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    borderColor: 'primary.main',
                  },
                }}
                component={Link}
                href={item.href}
              >
                {item.text}
              </Button>
            ))}
          </Stack>
          <Stack sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontWeight: '600' }}
              component={Link}
              href={route('login.show')}
            >
              Sign In
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
