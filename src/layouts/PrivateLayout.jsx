import Sidebar from 'components/Sidebar';
import { Outlet, useNavigate } from 'react-router';
import React, {useEffect, useState} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from 'graphql/auth/mutations';

const PrivateLayout = () => {
  const navigate=useNavigate();
  const {authToken,setToken,}=useAuth();
  const [loadingAuth, setLoadingAuth]=useState(true)
  const [refreshToken, {data:dataMutation, loading:loadingMutation, error:errorMutation}]=
  useMutation(REFRESH_TOKEN);

  useEffect(() => {

     refreshToken();
   }, [refreshToken]);

  useEffect(() => {
      console.log('dm',dataMutation);
      if(dataMutation){
      if(dataMutation.refreshToken.token){
        setToken(dataMutation.refreshToken.token);
      }
    else{
      setToken(null);
      navigate('/auth/login');
    }
  setLoadingAuth(false);}
  }, [dataMutation, setToken,loadingAuth]);

  useEffect(() => {
      console.log('TOKEN ACTTUAL',authToken);

     }, [authToken]);

  if (loadingMutation || loadingAuth)return <div>Loading...</div>;
  // if(!authToken) {
  //   navigate('/auth/login');
  // }
     

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PrivateLayout;
