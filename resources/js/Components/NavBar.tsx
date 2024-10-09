import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Experience Dance
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="primary" variant="contained">Home</Button>
            <Button color="inherit" variant="outlined">Events</Button>
            <Button color="inherit" variant="outlined">About</Button>
            <Button color="inherit" variant="outlined">Contact</Button>
          </Stack>
          <Stack>
            <Button color="inherit" variant="outlined">Submit Event</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
