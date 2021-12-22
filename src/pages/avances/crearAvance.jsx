import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { CREAR_AVANCE } from "graphql/avances/mutation";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CrearAvance=()=>{
    const {proyecto,creadoPor}=useParams();
    const { form, formData, updateFormData } = useFormData(null);
    console.log('LOS PARAMETROS SON',proyecto,creadoPor);
    const [crearAvance,{datamutation,mutationLoading,errordata}]=useMutation(CREAR_AVANCE,{
        variables:{proyecto:proyecto, creadoPor:creadoPor},
    });

    const submitForm=(e)=>{
        
        e.preventDefault();
        let descripcion=formData.descripcion;
        console.log("enviar datos al backedn",descripcion);
        crearAvance({variables:{proyecto, creadoPor,descripcion}});
        
        toast.success('Avance Creado');
        
    };
    useEffect(()=>{
        if(datamutation){
            toast.success('Avance creado');
        }
    },[datamutation]);
    return(
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
    <Link to='/misProyectos'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
    <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Crear Avance</h1>
    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'
    >
      
      
      <Input label='Descripción:' name='descripcion' type='text' required />
       
      <ButtonLoading
        disabled={Object.keys(formData).length === 0}
        loading={mutationLoading}
        text='Confirmar'
      />
    </form>
  </div>
    );
}
export {CrearAvance};