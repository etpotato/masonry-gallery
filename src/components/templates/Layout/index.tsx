import { Outlet } from 'react-router';
import { PexelsCredit } from '../../atoms/PexelsCredit';

export const Layout = () => {
  return (
    <main>
      <Outlet />
      <PexelsCredit />
    </main>
  );
};
