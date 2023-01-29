import Auth from 'components/auth/Auth';
import { pathName } from 'constants/pathName.constant';
import Error from 'pages/error/Error';
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
      <Route path={pathName.ERROR} element={<Error />} />
    </Routes>
  );
}

export default MainLayout;
