import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Input from "components/Input";
import useFormData from 'hooks/useFormData';
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";
import DropDown from "components/Dropdown";
import PrivateRoute from "components/PrivateRouter";
import PrivateComponent from "components/PrivateComponent";
import { GET_PROYECTO } from "graphql/proyectos/query";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";


const EditarProyectos=()=>{
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_PROYECTO,{
        variables:{_id},
    });
    //console.log('QUERY', queryData.buscarProyectoById.estado);
    //const [editarEstadoUsuario, {data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_ESTADO_USUARIO);
    const [editarProyecto,{data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_PROYECTO);
    const submitForm = (e) => {
        e.preventDefault();
        //console.log('FORM DATA', _id, formData);
        formData.presupuesto=parseFloat(formData.presupuesto);
        editarProyecto({
            variables:{_id,...formData},
        });        
      }
    
      useEffect(() => {
        if(mutationData){
            toast.success('Proyecto modificado');
        }
        console.log("Mutacion edicion", mutationData);
        }, [mutationData]);

    
        useEffect(() => {
            if(queryError){
                toast.error('Error listando proyecto');
            }
            else if (mutationError){
                toast.error('Error modificanco proyecto');
            }
        }, [queryError, mutationError]);
        if(queryLoading) return<div>Cargando...</div>
    return(
        <PrivateRoute roleList={["LIDER","ADMINISTRADOR"]}> 
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
    <Link to='/proyectos'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
    <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Proyecto</h1>
    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'
    >
      
      <Input
        label='Nombre del proyecto:'
        type='text'
        name='nombre'
        defaultValue={queryData.buscarProyectoById.nombre}
        required={true}
      />
      
      <DropDown
        label='Estado:'
        name='estado'
        defaultValue={queryData.buscarProyectoById.estado}
        required={true}
        options={Enum_EstadoProyecto}
      />

      <DropDown
          label='Fase:'
          name='fase'
          defaultValue={queryData.buscarProyectoById.fase}
          required={true}
          options={Enum_FaseProyecto}
      />
      <Input
        label='Presupuesto:'
        type='number'
        name='presupuesto'
        defaultValue={queryData.buscarProyectoById.presupuesto}
        required={true}
      />
       
      <ButtonLoading
        disabled={Object.keys(formData).length === 0}
        loading={mutationLoading}
        text='Confirmar'
      />
    </form>
  </div>
  </PrivateRoute>
    );
}
export {EditarProyectos};