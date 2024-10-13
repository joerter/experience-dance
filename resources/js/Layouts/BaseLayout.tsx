import NavBar from '@/Components/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <NavBar />
      {children}
    </>
  );
}

