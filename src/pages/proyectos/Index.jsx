import { useQuery } from '@apollo/client';
import { BUSCAR_ESTUDIANTES } from 'graphql/estudiantes/query';
import { PROYECTOS } from 'graphql/proyectos/query';
import React, {useEffect} from "react";
import { Link, } from "react-router-dom";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";

const IndexProyectos = () => {

  const {data, error, loading}=useQuery(PROYECTOS);
    useEffect(() => {
        console.log('ESTOS SON LOS PROYECTOS',data);
        //console.log('SOLO EL LIDER',data.Proyectos[3].nombre)

        //console.log('entrear',data.buscarLider[0].nombre)
    }, [data])

  return (
    
    <div>
            Todos los usuarios
            <table className='tabla'>
            <thead>
                <tr>
                    <th>Nombre Proyecto</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha fin</th>
                    <th>Estado</th>
                    <th>Fase</th>
                    <th>Nombre lider</th>
                    <th colSpan={2}>Editar</th>
                </tr>
            </thead>
            {data?
            <tbody>
                {data &&
                    data.Proyectos.map((u)=>{
                      console.log('QUE TENEMOS EN EL ULIDER',u.lider.nombre);
                        return(
                    <tr key={u._id}>
                        <td>{u.nombre}</td>
                        <td>{u.fechaInicio}</td>
                        <td>{u.fechaFin}</td>
                        <td>{Enum_EstadoProyecto[u.estado]}</td>
                        <td>{Enum_FaseProyecto[u.fase]}</td>
                        <td>{u.lider.nombre+' '+u.lider.apellido}</td>
                        
                        <td>
                        editar  
                        </td>
                    
                    
                        
                    </tr>
                );
                })}
            </tbody>
            :<div>no hay</div>}
            </table>

            <Link to={`/proyectos/crear`}>CrearProyecto
            <i className='fas fa-file-alt' />
            </Link>
        </div>

    
  );
};

export default IndexProyectos;
