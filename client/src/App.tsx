import MainLayout from 'components/mainLayout/MainLayout';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosClient from 'https/axiosClient';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

function App() {
  const navigate = useNavigate();

  axiosClient.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 400) {
      navigate('/error');
    }
    return response;
  });
  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
