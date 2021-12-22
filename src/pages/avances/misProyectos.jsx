import { useQuery } from '@apollo/client';
//import { INSCRIPCIONES_BY_ESTUDIANTE } from 'graphql/inscripcion/query';
import React from 'react'
import { useUser } from 'context/userContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter';
import { GET_USUARIO_BY_ID_AVANCES } from 'graphql/usuarios/queries';


const MisProyectos=()=>{
    const { userData } = useUser();
    let _id=userData._id;
    
    
    const {data,error,loading}=useQuery(GET_USUARIO_BY_ID_AVANCES,{
        variables:{_id:_id}
    });

    // const  dataA=useQuery(AVANCES);
    // console.log('ESTOS SON LOS AVANCES', dataA);
    
    

    useEffect(()=>{
        console.log('LO DEL INSCRIPCIONES',data);
    },[data]);

    // useEffect(()=>{
    //     toast.error('Erro consultando mis proyectos');
    // },[error]);
    // if (loading) return <div>Cargando...</div>
    return(
        <PrivateRoute roleList={['LIDER']}>
        <div>
            
            <h1 className='text-3xl font-bold my-4'>Mis proyectos. Lider: {userData.nombre+' '+userData.apellido}</h1>
            <table className='tabla'>
                <thead>
                    <tr>
                    <th>Nombre proyecto</th>
                    <th>Fecha de inicio</th>
                    <th>fecha fin</th>
                    <th>Estado</th>
                    <th>Fase</th>
                    <th>presupuesto</th>
                    <th>objetivos</th>
                    <th>Avances</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                      {data &&
                      data.buscarUsuario.proyectosLiderados.map((u)=>{
                          return(
                          <tr>
                              <td>{u.nombre}</td>
                              <td>{u.fechaInicio}</td>
                              <td>{u.fechaFin}</td>
                              <td>{u.estado}</td>
                              <td>{u.fase}</td>
                              <td>{u.presupuesto}</td>
                              <td>
                                  {u.objetivos.map((o)=>{
                                      return(
                                          <div>
                                          <tr>{o.descripcion}</tr>
                                          <tr className='text-green-600 font-bold my-4'>{o.tipo.toLowerCase()}</tr>
                                          </div>
                                          
                                      );
                                  })}
                              </td>
                              <td>
                                  {u.avances.map((a)=>{
                                      return(
                                          <div>
                                              <tr className='text-green-600 font-bold my-4'>{a.descripcion+' '}<Link to={`/misProyectos/crearObservacion`}><i className="fas fa-plus text-yellow-600 hover:text-yellow-400 cursor-pointer"> Add observación</i></Link></tr>
                                              <tr>{a.fecha}</tr>
                                              <tr className='text-yellow-600 hover:text-yellow-400 cursor-pointer'>By: {a.creadoPor.nombre+' '+a.creadoPor.apellido}</tr>
                                            <tr className='text-blue-600'>Observaciones: {a.oservaciones}</tr>
                                          </div>
                                      );
                                  })}
                              </td>
                              <td>opciones</td>
                          </tr>
                          );
                      })}          
                </tbody>
            </table>
            
        </div>
        </PrivateRoute>
    );
}

export {MisProyectos};