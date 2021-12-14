import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import { useParams, Link } from "react-router-dom";
import React from "react";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import { useMutation, useQuery } from "@apollo/client";

import useFormData from "hooks/useFormData";
import PrivateRoute from "components/PrivateRouter";
import PrivateComponent from "components/PrivateComponent";
import { Enum_EstadoProyecto } from "utils/enums";
import ButtonLoading from "components/ButtonLoading";
import { GET_PROYECTO } from "graphql/proyectos/query";
import { Enum_FaseProyecto } from "utils/enums";
import { GET_USUARIO } from "graphql/usuarios/queries";

const EditarProyecto=()=>{

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_PROYECTO,{
        variables:{_id},
    });
    

    //console.log('EL PROYECTO',queryData.buscarProyectoById.lider._id);
    
    const [editarProyecto, {data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_PROYECTO);
    //
    const submitForm = (e) => {
        e.preventDefault();
        //delete formData.rol;
        editarProyecto({
          variables: { _id, ...formData },
        });
      };

    return(
        
        <PrivateRoute roleList={["ADMINISTRADOR"]}> 
      {queryData?  
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
      <Input
        label='Presupuesto:'
        type='number'
        name='presupuesto'
        defaultValue={queryData.buscarProyectoById.presupuesto}
        required={true}
      />
      {/* <Input
        label='Fecha de inicio:'
        type='date'
        name='nombre'
        defaultValue={queryData.buscarProyectoById.fechaInicio}
        required={true}
      /> */}

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

{/* <DropDown
        label='Lider:'
        name='lider'
        //defaultValue={queryData.buscarProyectoById.fase}
        required={true}
        defaultValue={queryData.buscarProyectoById.lider.nombre}
        options={['otoro']}
      /> */}
       
    
      <ButtonLoading
        disabled={Object.keys(formData).length === 0}
        loading={mutationLoading}
        text='Confirmar'
      />
    </form>
  </div>:
  <div>Error</div>}
  </PrivateRoute>
    );
}

export {EditarProyecto};