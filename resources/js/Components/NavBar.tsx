import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar } from "@mui/material";
import { useState } from "react";

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Events', href: '/events' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
]

function SideNav({ onToggleSideNav }: { onToggleSideNav: () => void }) {
  return (
    <Box onClick={onToggleSideNav} sx={{ px: 6 }}>
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
            <ListItemButton sx={{ textAlign: 'center' }} href={item.href}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}


export default function NavBar() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleToggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img width="160px" height="44px" src="/images/logo-white.svg" />
          <Stack direction="row" spacing={2} sx={(theme) => ({
            p: 2,
            border: `1px solid ${theme.palette.gray2.main}`,
            borderRadius: '30px',
            display: { xs: 'none', lg: 'flex' }
          })}>
            {navItems.map((item, i) => (
              <Button key={i} color="inherit" variant="outlined">{item.text}</Button>
            ))}
          </Stack>
          <Stack sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Button color="inherit" variant="outlined" sx={{ fontWeight: '600' }}>Submit Event</Button>
          </Stack>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { xs: 'block', lg: 'none' } }}
            onClick={() => { handleToggleSideNav(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={24} width={24}>
              <line x1="4" y1="6" x2="20" y2="6" stroke="white" stroke-width="2" stroke-linecap="round" />
              <line x1="12" y1="12" x2="20" y2="12" stroke="white" stroke-width="2" stroke-linecap="round" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={sideNavOpen} onClose={() => { handleToggleSideNav() }} PaperProps={{ sx: { background: 'black', color: 'white' } }}>
        <SideNav onToggleSideNav={handleToggleSideNav} />
      </Drawer>
    </Box>
  )
}
