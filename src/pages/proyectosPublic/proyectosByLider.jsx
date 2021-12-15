import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_BY_LIDER } from "graphql/proyectosPublic/query";
import React ,{useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ProyectosByLider=()=>{
    
    const {_id}=useParams();
    console.log(_id);
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_PROYECTOS_BY_LIDER,{
        variables:{_id},
    });
    
    
    useEffect(() => {
        if (queryError){
            toast.error('Error buscando proyectos');
        }
    }, [queryError]);
    if(queryLoading) return <div>Cargando</div>;
    return (
        <div>
        <Link to='/allProjects'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
    <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre del Proyecto</th>
                    </tr>
                </thead>
                <tbody>
                {queryData &&
                queryData.buscarProyectosByLider.map((u)=>{
                    return (
                        <tr>
                        <td>{u.nombre}</td>
                        <td>
                            <Link to={`/allProjects/liderEditarProyecto/${u._id}`}>editar</Link>
                        </td>
                    </tr>
                    );
                })}
                    
                </tbody>    
            </table>
    </div>
    );
}
export {ProyectosByLider};