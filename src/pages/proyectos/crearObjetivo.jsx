import { useMutation } from "@apollo/client";
import PrivateRoute from "components/PrivateRouter";
import { CREAR_OBJETIVO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DropDown from "components/Dropdown";
import { Enum_TipoObjetivo } from "utils/enums";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { toast } from "react-toastify";

const CrearObjetivo=()=>{
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    console.log('EL ID DEL PROYECTO',_id);
    const [crearObjetivo, {data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(CREAR_OBJETIVO);

    const submitForm=(e)=>{
        //formData=Object.assign(_id);
        const id={idProyecto:_id};
        e.preventDefault();
        const unir=Object.assign(id,formData);
        //console.log("enviar datos al backedn",unir)

        crearObjetivo({variables:unir});
    };

    useEffect(() => {
        if(mutationData){
            toast('Objetivo creado');
        }
    }, [mutationData]);

    useEffect(() => {
        if(mutationError){
            toast('Error creando objetivo')
        }
    }, [mutationError])

    return(
        <PrivateRoute roleList={["LIDER","ADMINISTRADOR"]}> 
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
    <Link to='/usuarios'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
    <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Crear objetivo</h1>
    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'
    >
      
      <DropDown
        label='Tipo:'
        name='tipo'
        required={true}
        options={Enum_TipoObjetivo}
      />
      <Input label='Descripción:' name='descripcion' type='text' required />
       
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
export {CrearObjetivo};