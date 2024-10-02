import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />
    </>
  );
}

Welcome.layout = (page: ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>) => (
  <BaseLayout children={page}>
  </BaseLayout>
)

export default Welcome
