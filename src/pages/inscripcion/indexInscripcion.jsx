import { useMutation, useQuery } from "@apollo/client";
import PrivateComponent from "components/PrivateComponent";
import PrivateRoute from "components/PrivateRouter";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripcion/mutation";
import { APROBAR_INSCRIPCION } from "graphql/inscripcion/mutation";
import { INSCRIPCIONES } from "graphql/inscripcion/query";


import React ,{useEffect} from "react";
import { toast } from "react-toastify";

const IndexInscripcion=()=>{
    const{data, error, loading}=useQuery(INSCRIPCIONES);
    const [aprobarInscripcion,{datam:mutationData, loadingm:mutationLoading,errorm:mutationError}]=useMutation(APROBAR_INSCRIPCION);
    const [rechazarInscripcion,{datar:mutationDatar,loadingr:mutationLoadingr,errorr:mutationErrorr}]=useMutation(RECHAZAR_INSCRIPCION);
    useEffect(() => {
        if (data && data.Inscripciones){
            data.Inscripciones.map((m)=>{
                console.log('dfsdf  nhdkhfdhnJHDFJKHD',m.estudiante.nombre);
            })
        }
    }, [data]);

    const aprobarSolicitud=(_id)=>{
        
        console.log('FUNCIONA',_id);
        aprobarInscripcion({
            variables:{_id},
        });
        toast.success('Aprobado');
    };

    const rechazarSolicitud=(_id)=>{
        console.log('RECHAZAR',_id);
        rechazarInscripcion({
            variables:{_id},
        });
        
            toast.success('Rechazado');
        
    };

    if (loading) return <div>Cargando...</div>

    return(
        <PrivateRoute roleList={['ADMINISTRADOR','LIDER']}>
        <div>
            <h1 className='text-3xl font-bold my-4'>Inscripciones</h1>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre Proyecto</th>
                        <th>Estado solicitud</th>
                        <th>Solicitado por</th>
                        <th>fecha ingreso</th>
                        <th>fecha Egreso</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
               
                    {data && data.Inscripciones &&
                    data.Inscripciones.map((u)=>{
                        return (
                            
                            <tr key={u._id}>

                                <td>{u.proyecto.nombre}</td>
                                <td>{u.estado}</td>
                                <td>{u.estudiante.nombre+' '+u.estudiante.apellido}</td>
                                <td>{u.fechaIngreso}</td>
                                <td>{u.fechaEgreso}</td>
                                
                                <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
                                    <td>
                                        {
                                            u.estado==='PENDIENTE'?
                                            <div className='grid grid-cols-2 gap-1'><div><button onClick={aprobarSolicitud.bind(this,u._id)}><i className="fas fa-check  text-green-600 hover:text-green-400 cursor-pointer"></i></button></div><div><button onClick={rechazarSolicitud.bind(this,u._id)}><i class="fas fa-times  text-red-600 hover:text-red-400 cursor-pointer"></i></button></div></div>:
                                            u.estado==='ACEPTADO'?
                                            <div><i className="text-green-600 hover:text-yellow-400 cursor-pointer"> Solicitud aceptada</i></div>:
                                            <div><i className="text-red-600 hover:text-green-400 cursor-pointer"> Solicitud rechazada</i></div>
                                        }
                                    </td>
                                </PrivateComponent>

                                <PrivateComponent roleList={['ESTUDIANTE']}>
                                    <td>{
                                        u.estado==="PENDIENTE"?
                                            <div><i className="text-yellow-600 hover:text-red-400 cursor-pointer"> Solicitud pendiente</i></div>:
                                        u.estado==="ACEPTADO"?
                                            <div><i className="text-green-600 hover:text-yellow-400 cursor-pointer"> Solicitud aceptada</i></div>:
                                        <div><i className="text-red-600 hover:text-green-400 cursor-pointer"> Solicitud rechazada</i></div>
                                        }
                                        
                                    </td>
                                </PrivateComponent>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </PrivateRoute>
    );
};
export {IndexInscripcion};