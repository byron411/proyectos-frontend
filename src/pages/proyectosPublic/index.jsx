import { useQuery } from "@apollo/client";
import DropDown from "components/Dropdown";
import { PROYECTOS } from "graphql/proyectos/query";
import { GET_LIDERES } from "graphql/usuarios/queries";
import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFormData from 'hooks/useFormData';
import ButtonLoading from "components/ButtonLoading";
import { Enum_EstadoProyecto, Enum_FaseProyecto,Enum_TipoObjetivo } from "utils/enums";
import PrivateComponent from "components/PrivateComponent";

const IndexProyectosPublic=()=>{
    const {data, error, loading}=useQuery(PROYECTOS);
    const datal=useQuery(GET_LIDERES);
    const { form, formData, updateFormData } = useFormData(null);
    const navigate=useNavigate();
    useEffect(() => {
        if(data){
        console.log('TODOS LOS PROYECTOS',data);
        }
    }, [data])
    // useEffect(() => {
    //     console.log('LOS LIDERES',datal);
    //  }, [datal])
    let idsLideres=[]; 
    
    
    
    // if(data){
    //     data.Proyectos.map()=>
    // }
    useEffect(() => {
        if(error){
            toast.error('Error consultando los proyectos');
        }
    }, [error])
    
    if (loading) return<div>Cargando...</div>;
    if(datal.data){
        datal.data.buscarLider.map((u)=>{
            console.log(u._id);
            idsLideres.push(u._id);
        });}
    const submitForm = (e) => {
        e.preventDefault();
        let ellider=idsLideres[formData.lider];
        //console.log('ACTUAR',formData.lider);  
        navigate(`/proyectosByLider/${ellider}`);    
      }
      
    return(
        <div>
            <h1 className='text-3xl font-bold my-4'>Proyectos</h1>
            

    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'    >
      
      {datal && data?           
            <DropDown label= 'Buscar por líder'  name='lider' 
            //defaultValue={[queryData.buscarProyectoById.lider.nombre]}
            
             options={
                 
                 data && datal.data &&
            datal.data.buscarLider.map((i)=>{return(i.nombre +' '+ i.apellido);})
            }
            />:<div>Cargando...</div>} 
            <ButtonLoading
        disabled={Object.keys(formData).length === 0}
        loading={false}
        text='Buscar'
      />
        </form>
        <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
            <Link to={`/proyectosByLider/crearProyectoLider/:_id`}>Crear Proyecto
            <i className='fas fa-file-alt' />
            </Link>
            </PrivateComponent>
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
                {data &&
                data.Proyectos.map((u)=>{
                    return (
                        <tr key={u._id}>
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
                                        <tr>{Enum_TipoObjetivo[o.tipo]+': '+o.descripcion}
                                        
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
                        <td>
                        <PrivateComponent roleList={['ESTUDIANTE']}>
                                <div>Inscripción</div>
                        </PrivateComponent>
                        </td>
                    </tr>
                    );
                })}
                    
                </tbody>    
            </table>
        </div>
    );
}
export  {IndexProyectosPublic};