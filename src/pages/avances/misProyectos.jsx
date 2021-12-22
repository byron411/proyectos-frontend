import { useQuery } from '@apollo/client';
import { INSCRIPCIONES_BY_ESTUDIANTE } from 'graphql/inscripcion/query';
import React from 'react'
import { useUser } from 'context/userContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter';


const MisProyectos=()=>{
    const { userData } = useUser();
    let estudiante=userData._id;
    
    
    const {data,error,loading}=useQuery(INSCRIPCIONES_BY_ESTUDIANTE,{
        variables:{estudiante:estudiante}
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
        <PrivateRoute roleList={['ESTUDIANTE']}>
        <div>
            
            <h1 className='text-3xl font-bold my-4'>Mis proyectos. Estudiante: {userData.nombre+' '+userData.apellido}</h1>
            <table className='tabla'>
                <thead>
                    <tr>
                    <th>Nombre proyecto</th>
                    <th>Fase</th>
                    <th>fecha Inicio</th>
                    <th>fecha Fin</th>
                    <th>Estado inscripción</th>
                    <th>Avances</th>
                    <th>opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && 
                    data.inscripcionByEstudiante.map((u)=>{
                        return (
                        <tr key={u._id}>
                            <td>{u.proyecto.nombre}</td>
                            <td>{u.proyecto.fase}</td>
                            <td>{u.proyecto.fechaInicio}</td>
                            <td>{u.proyecto.fechaFin}</td>
                            <td>{u.estado}</td>
                            <td>
                                {u.proyecto.avances.map((a)=>{
                                    return(
                                        <div>
                                            <tr className='text-green-600 font-bold my-4'>{a.descripcion}</tr>
                                            <tr>{a.fecha}</tr>
                                            <tr className='text-yellow-600 hover:text-yellow-400 cursor-pointer'>By: {a.creadoPor.nombre+' '+a.creadoPor.apellido}</tr>
                                            <tr className='text-blue-600'>Observaciones: {a.oservaciones}</tr>
                                        </div>
                                        
                                    );
                                })}
                            </td>
                            <td>
                                {u.estado ==="ACEPTADO"?
                                <div><Link to={`/misProyectos/crearAvance/${u.proyecto._id}/${u.estudiante._id}`}><i className="fas fa-plus text-yellow-600 hover:text-yellow-400 cursor-pointer">Avance</i></Link></div>:
                                u.estado === "PENDIENTE"?
                                <div>Pendiente</div>:
                                <div>Rechazado</div>}
                            </td>
                        </tr>);
                    })
                    }
                </tbody>
            </table>
            
        </div>
        </PrivateRoute>
    );
}

export {MisProyectos};