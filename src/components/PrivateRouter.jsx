import { useUser } from 'context/userContext';
import React from 'react';
const PrivateRoute=({roleList,children})=>{
    const{userData}=useUser();
    if (roleList.includes(userData.rol)){
        return children;
    }
    return <div className='text-9x1 text-red-500'>No estás autorizado para ver este sitio.</div>;
};

export default PrivateRoute;