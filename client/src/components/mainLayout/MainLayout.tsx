import { pathName } from 'constants/pathName.constant';
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function MainLayout() {
  return (
    <Routes>
      <Route path={pathName.HOME} element={<Home />} />
      <Route path={pathName.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default MainLayout;
