import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import React, {useEffect} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Enum_Rol } from "utils/enums";
import { Enum_EstadoUsuario } from "utils/enums";
import PrivateRoute from "components/PrivateRouter";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from 'context/userContext';



const IndexUsuarios=()=>{
    const { userData } = useUser();
    console.log('Aqui tenemos el contexto desde indes de usuario.jsx',{userData});
    var rolLogueado=userData.rol;
    
    const {data, error, loading}=useQuery(GET_USUARIOS);
    useEffect(() => {
        console.log('Datos servidor ',data);
    }, [data]);
    useEffect(() => {
        if(error){
            toast.error('Error consultando los usuarios');
        }        
    }, [error]);
    if(loading) return <div>Cargando...</div>;
    return(
       <PrivateRoute roleList={["ADMINISTRADOR","LIDER"]}> 
    
        <div>
            Todos los usuarios
            <table className='tabla'>
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Identificación</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th colSpan={2}>Editar</th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.Usuarios.map((u)=>{
                        return(
                    <tr key={u._id}>
                        <td>{u.nombre}</td>
                        <td>{u.apellido}</td>
                        <td>{u.correo}</td>
                        <td>{u.identificacion}</td>
                        <td>{Enum_Rol[u.rol]}</td>
                        <td>{Enum_EstadoUsuario[u.estado]}</td>
                        {rolLogueado==="ADMINISTRADOR"?
                        <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>  
                        </td>
                    :
                    <td>
                        <Link to={`/usuarios/editarEstado/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>  
                        </td>       
                    }
                    
                        <PrivateComponent roleList={['ADMINISTRADOR']}>
                        <td>
                        <Link to={`/usuarios/eliminar/${u._id}`}>
                          <i className='fas fa-trash-alt text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                        </td>
                        </PrivateComponent>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        </PrivateRoute>
        
    )
}
export default IndexUsuarios;