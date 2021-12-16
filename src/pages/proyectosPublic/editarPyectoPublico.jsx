import { useMutation, useQuery } from "@apollo/client";
import PrivateRoute from "components/PrivateRouter";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import { GET_PROYECTO } from "graphql/proyectos/query";
import useFormData from "hooks/useFormData";
import React, {useEffect} from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
const EditarProyectoPublico=()=>{
    const{form, formData, updateFormData}=useFormData(null);
    const{_id}=useParams();
    const{
        data:queryData,
        error:queryError,
        loading:queryLoading
    }=useQuery(GET_PROYECTO,{
        variables:{_id},
    });
    const [editarProyecto, {data:mutatioData, loading:mutationLoading, error:mutarionError}]=useMutation(EDITAR_PROYECTO);
    console.log('EL PROYECTO',queryData);
    const submitForm=(e)=>{
        e.preventDefault();
        formData.presupuesto=parseFloat(formData.presupuesto);
        editarProyecto({
            variables:{_id, ...formData},
        });
    };
    useEffect(() => {
        if(queryError){
            toast.error('Error trayendo proyecto');
        }
        else if(mutarionError){
            toast.error('Error actualizando proyecto');
        }
    }, [queryError, mutarionError]);
    useEffect(() => {
        if(mutatioData){
            toast.success('Proyecto modificado');
        }
    }, [mutatioData]);
    if (queryLoading) return<div>Cargando...</div>
    return (
        <PrivateRoute roleList={["LIDER","ADMINISTRADOR"]}>
        <div>
        <Link to='/allProjects'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Proyecto</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col items-center justify-center'>
                <Input
                label='Nombre del proyecto:'
                type='text'
                name='nombre'
                defaultValue={queryData.buscarProyectoById.nombre}
                required={true}/>
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
export {EditarProyectoPublico};