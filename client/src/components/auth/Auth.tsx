import { pathName } from 'constants/pathName.constant';
import Login from 'pages/login/Login';
import Register from 'pages/register/Register';
import React from 'react';

export interface IAuthProps {
  route: pathName.LOGIN | pathName.REGISTER;
}
const Auth = (props: IAuthProps) => {
  const { route } = props;
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {route === pathName.LOGIN ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
