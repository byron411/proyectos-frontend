import React from 'react';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';

const Admin = () => {
  const { userData } = useUser();
  console.log('Aqui tenemos el contexto desde admin.jsx',{userData});
  var rol=userData.rol;
  
  if (rol==='ADMINISTRADOR'){
  return (
    <PrivateComponent roleList={['ADMINISTRADOR']}>
  <div>Bienvenido {userData.nombre} {userData.apellido}</div>
  </PrivateComponent>
  );
  }
  else{
    return (
    <div>
    <h2>Estimad@ {userData.nombre} {userData.apellido}. Su rol es: {rol}, no tine acceso a administración.</h2>
    <h3>Si considera que su rol no es correcto, por favor comuniquese con el administrador del sistema</h3>
    </div>
    );
  }
};

export default Admin;
