import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img width="160px" height="44px" src="/images/logo-white.svg" />
          <Stack direction="row" spacing={2} sx={(theme) => ({
            p: 2,
            border: `1px solid ${theme.palette.gray2.main}`,
            borderRadius: '30px'
          })}>
            <Button color="primary" variant="contained">Home</Button>
            <Button color="inherit" variant="outlined">Events</Button>
            <Button color="inherit" variant="outlined">About</Button>
            <Button color="inherit" variant="outlined">Contact</Button>
          </Stack>
          <Stack>
            <Button color="inherit" variant="outlined" sx={{ fontWeight: '600' }}>Submit Event</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
