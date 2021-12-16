import { useQuery } from "@apollo/client";
import PrivateComponent from "components/PrivateComponent";
import { INSCRIPCIONES } from "context/inscripcion/query";
import React ,{useEffect} from "react";

const IndexInscripcion=()=>{
    const{data, error, loading}=useQuery(INSCRIPCIONES);
    useEffect(() => {
        if (data && data.Inscripciones){
            data.Inscripciones.map((m)=>{
                console.log('dfsdf  nhdkhfdhnJHDFJKHD',m.estudiante.nombre);
            })
        }
        
        
    }, [data])
    return(
        <div>
            <h1>Inscripciones</h1>
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
                            
                            <tr>

                                <td>{u.proyecto.nombre}</td>
                                <td>{u.estado}</td>
                                <td>{u.estudiante.nombre+' '+u.estudiante.apellido}</td>
                                <td>{u.fechaIngreso}</td>
                                <td>{u.fechaEgreso}</td>
                                
                                <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
                                    <td>
                                        {
                                            u.estado==='PENDIENTE'?
                                            <div className='grid grid-cols-2 gap-1'><div><i className="fas fa-check  text-green-600 hover:text-green-400 cursor-pointer"></i></div><div><i class="fas fa-times  text-red-600 hover:text-red-400 cursor-pointer"></i></div></div>:
                                            u.estado==='ACEPTADO'?
                                            <div><i class="text-green-600 hover:text-yellow-400 cursor-pointer"> Solicitud aceptada</i></div>:
                                            <div><i class="text-red-600 hover:text-green-400 cursor-pointer"> Solicitud rechazada</i></div>
                                        }
                                    </td>
                                </PrivateComponent>

                                <PrivateComponent roleList={['ESTUDIANTE']}>
                                    <td>{
                                        u.estado==="PENDIENTE"?
                                            <div><i class="text-yellow-600 hover:text-red-400 cursor-pointer"> Solicitud pendiente</i></div>:
                                        u.estado==="ACEPTADO"?
                                            <div><i class="text-green-600 hover:text-yellow-400 cursor-pointer"> Solicitud aceptada</i></div>:
                                        <div><i class="text-red-600 hover:text-green-400 cursor-pointer"> Solicitud rechazada</i></div>
                                        }
                                        
                                    </td>
                                </PrivateComponent>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
export {IndexInscripcion};