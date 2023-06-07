import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/UI/MainNavigation';


function RootLayout() {
  
  return (
    <>
     <MainNavigation />
      <main>       
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
