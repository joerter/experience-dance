import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}

