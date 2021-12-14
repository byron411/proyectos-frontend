import { useQuery } from "@apollo/client";
import { BUSCAR_ESTUDIANTES } from "graphql/estudiantes/query";
import React, {useEffect} from "react";
import { Enum_EstadoUsuario } from "utils/enums";
import { Enum_Rol } from "utils/enums";
import { useUser } from 'context/userContext';
import { Link } from "react-router-dom";

const IndexEstudiante=()=>{
    const { userData } = useUser();
    
    var rolLogueado=userData.rol;
    const {data, error, loading}=useQuery(BUSCAR_ESTUDIANTES);
    useEffect(() => {
        console.log('ESTOS SON LOS ESTUDIANTE',data);
    }, [data])
    return (
        <div>
        <h1  className='text-3xl font-bold my-4'>Estudiantes</h1>
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
                data.buscarEstudiante.map((u)=>{
                    return(
                <tr key={u._id}>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.identificacion}</td>
                    <td>{Enum_Rol[u.rol]}</td>
                    <td>{Enum_EstadoUsuario[u.estado]}</td>
                    {rolLogueado==="LIDER" || rolLogueado==="ADMINISTRADOR"?
                
                <td>
                    <Link to={`/usuarios/editarEstado/${u._id}`}>
                      <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                    </Link>  
                    </td>    :
                    <div>sin acceso</div>   
                }
                
                    
                    
                    
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    );
}

export {IndexEstudiante};