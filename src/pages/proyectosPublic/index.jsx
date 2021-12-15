import { useQuery } from "@apollo/client";
import DropDown from "components/Dropdown";
import { PROYECTOS } from "graphql/proyectos/query";
import { GET_LIDERES } from "graphql/usuarios/queries";
import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFormData from 'hooks/useFormData';
import ButtonLoading from "components/ButtonLoading";

const IndexProyectosPublic=()=>{
    const {data, error, loading}=useQuery(PROYECTOS);
    const datal=useQuery(GET_LIDERES);
    const { form, formData, updateFormData } = useFormData(null);
    const navigate=useNavigate();
    useEffect(() => {
        console.log('TODOS LOS PROYECTOS',data);
        
    }, [data])
    // useEffect(() => {
    //     console.log('LOS LIDERES',datal);
    //  }, [datal])
    let idsLideres=[]; 
    if(datal.data){
    datal.data.buscarLider.map((u)=>{
        console.log(u._id);
        idsLideres.push(u._id);
    });}
    //console.log('LA LISTA DE LIDERES',idsLideres);
    useEffect(() => {
        if(error){
            toast.error('Error consultando los proyectos');
        }
    }, [error])
    
    if (loading) return<div>Cargando...</div>;
    
    const submitForm = (e) => {
        e.preventDefault();
        let ellider=idsLideres[formData.lider];
        console.log('ACTUAR',formData.lider);  
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
      {datal?           
            <DropDown label= 'Buscar por líder'  name='lider' 
            //defaultValue={[queryData.buscarProyectoById.lider.nombre]}
            
             options={data &&
            datal.data.buscarLider.map((i)=>{
              return(
                i.nombre +' '+ i.apellido
              );
            })
            } 
            />:<div>Cargando...</div>} 
            <ButtonLoading
        disabled={Object.keys(formData).length === 0}
        loading={false}
        text='Buscar'
      />
        </form>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre del Proyecto</th>
                    </tr>
                </thead>
                <tbody>
                {data &&
                data.Proyectos.map((u)=>{
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
export  {IndexProyectosPublic};