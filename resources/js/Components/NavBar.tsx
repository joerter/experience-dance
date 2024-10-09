import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Experience Dance
          </Typography>
          <Stack direction="row">
            <Button color="inherit">Home</Button>
            <Button color="inherit">Events</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Stack>
          <Stack>
            <Button color="inherit">Submit Event</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
