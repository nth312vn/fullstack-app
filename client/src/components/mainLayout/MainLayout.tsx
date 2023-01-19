import Auth from 'components/auth/Auth';
import { pathName } from 'constants/pathName.constant';
import Home from 'pages/home/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function MainLayout() {
  return (
    <Routes>
      <Route path={pathName.HOME} element={<Home />} />
      <Route path={pathName.LOGIN} element={<Auth route={pathName.LOGIN} />} />
      <Route
        path={pathName.REGISTER}
        element={<Auth route={pathName.REGISTER} />}
      />
    </Routes>
  );
}

export default MainLayout;
