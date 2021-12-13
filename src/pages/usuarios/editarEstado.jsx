import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIO } from "graphql/usuarios/queries";
import Input from "components/Input";
import useFormData from 'hooks/useFormData';
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_ESTADO_USUARIO } from "graphql/usuarios/mutations";
import { toast } from "react-toastify";
import DropDown from "components/Dropdown";
import { Enum_EstadoUsuario } from "utils/enums";
import { Enum_Rol } from "utils/enums";
import PrivateRoute from "components/PrivateRouter";
import PrivateComponent from "components/PrivateComponent";


const EditarEstadoUsuario=()=>{
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_USUARIO,{
        variables:{_id},
    });
    const [editarEstadoUsuario, {data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_ESTADO_USUARIO);
    

    const submitForm = (e) => {
        e.preventDefault();
        //delete formData.rol;
        editarEstadoUsuario({
          variables: { _id, ...formData },
        });
      };

     useEffect(() => {
         if(queryError){
             toast.error('Error listando usuario');
         }
         else if (mutationError){
             toast.error('Error modificanco usuario');
         }
     }, [queryError, mutationError]);
    
    useEffect(() => {
        if(mutationData){
            toast.success('Usuario modificado');
        }
        console.log("Mutacion edicion", mutationData);
        }, [mutationData]);
      if(queryLoading) return<div>Cargando...</div>
    return( 
      <PrivateRoute roleList={["LIDER","ADMINISTRADOR"]}> 
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
    <Link to='/usuarios'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
    <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'
    >
      
      
      
      <DropDown
        label='Estado de la persona:'
        name='estado'
        defaultValue={queryData.buscarUsuario.estado}
        required={true}
        options={Enum_EstadoUsuario}
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
};

export default EditarEstadoUsuario;