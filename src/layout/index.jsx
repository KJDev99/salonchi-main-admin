import { Sidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};
