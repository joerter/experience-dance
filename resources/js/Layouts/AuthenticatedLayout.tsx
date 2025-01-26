import AppShell from '@/Components/AppShell';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;

  return <AppShell user={user}>{children}</AppShell>;
}
