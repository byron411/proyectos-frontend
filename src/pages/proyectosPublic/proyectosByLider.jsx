import { useQuery } from "@apollo/client";
import PrivateComponent from "components/PrivateComponent";
import { GET_PROYECTOS_BY_LIDER } from "graphql/proyectosPublic/query";
import React ,{useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Enum_EstadoProyecto, Enum_FaseProyecto,Enum_TipoObjetivo } from "utils/enums";
const ProyectosByLider=()=>{
    
    const {_id}=useParams();
    console.log(_id);
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_PROYECTOS_BY_LIDER,{
        variables:{_id},
    });
    let nombreLider=''
    let estado='';
    if(queryData){
        queryData.buscarProyectosByLider.map((i)=>{
            console.log('LIDER',i.lider.nombre);
            nombreLider=i.lider.nombre
            estado=i.estado;
        });
    }
    console.log('EL NOMBRE DEL LIDER ES ',nombreLider);
    
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
    <h1 className='text-3xl font-bold my-4'>Proyectos Liderados por {nombreLider}</h1>
    <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre del Proyecto</th>
                        <th>Fecha de inicio</th>
                    <th>Fecha fin</th>
                    <th>Estado</th>
                    <th>Fase</th>
                    <th>Nombre lider</th>
                    <th>presupuesto</th>
                    <th>Objetivos</th>
                    <th colSpan={2}>Editar</th>
                    </tr>
                </thead>
                <tbody>
                {queryData &&
                queryData.buscarProyectosByLider.map((u)=>{
                    return (
                        <tr>
                        <td>{u.nombre}</td>
                        <td>{u.fechaInicio}</td>
                        <td>{u.fechaFin}</td>
                        <td>{Enum_EstadoProyecto[u.estado]}</td>
                        <td>{Enum_FaseProyecto[u.fase]}</td>
                        <td>{u.lider.nombre+' '+u.lider.apellido}</td>
                        <td>{new Intl.NumberFormat("co-CO",{style:"currency",currency:"COP"}).format(u.presupuesto)}</td>
                        {u.objetivos.map((o)=>{
                                      return(
                                        <div>
                                        <tr>
                                        
                                        {Enum_TipoObjetivo[o.tipo]+': '+o.descripcion}
                                        
                                        </tr>
                                        </div>
                                      );
                               })} 
                               <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
                               
                               {
                                Enum_EstadoProyecto[u.estado]==='Activo'?
                                <div>
                               <Link to={`/proyectosByLider/crearObjetivoLider/${u._id}`}>
                               
                               <i class="fas fa-plus text-yellow-600 hover:text-yellow-400 cursor-pointer"> Add</i>
                               </Link>
                               </div>:<div><i class="text-yellow-600 hover:text-yellow-400 cursor-pointer"> Inactivo</i></div>
                               }
                               </PrivateComponent>
                    

                        
                        <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
                        <td>
                        {
                            Enum_EstadoProyecto[u.estado]==='Activo'?
                            <div><Link to={`/allProjects/liderEditarProyecto/${u._id}`}>
                                <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                                </Link></div>:<div><i class="text-yellow-600 hover:text-yellow-400 cursor-pointer"> Inactivo</i></div>

                        
                        }
                        </td>    

                        </PrivateComponent>
                        
                        <PrivateComponent roleList={['ESTUDIANTE']}>
                        <td>
                                <div>Inscripción</div>
                                </td>
                        </PrivateComponent>
                        
                    </tr>
                    );
                })}
                    
                </tbody>    
            </table>
    </div>
    );
}
export {ProyectosByLider};