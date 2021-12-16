import React, {useEffect} from "react";
import Input from "components/Input";
import { Enum_Rol } from "utils/enums";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import { REGISTRO } from "graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";
import { toast } from "react-toastify";

const Register=()=>{
  const {setToken}=useAuth
    const navigate=useNavigate();
    //Me ayuda a trabajar con formularios
    const {form, formData, updateFormData}=useFormData();

    const [registro, {data: dataMutation, loading:loadingMutation, error: errorMutation}]=
    useMutation(REGISTRO);

    const submitForm=(e)=>{
        e.preventDefault();
        console.log("enviar datos al backedn",formData)
        registro({variables:formData});
       
    };

    useEffect(() => {
        console.log('datos mutacion', dataMutation);
        if(dataMutation){
        if(dataMutation.registro.token){
          
         // setToken(dataMutation.registro.token);
            navigate('/');
        }
      
      }
    }, [dataMutation, setToken,navigate]);

    useEffect(() => {
      if(errorMutation){
        toast.error('Ha ocurrido un error');
      }
    }, [errorMutation])
    if(loadingMutation) return <div>cargando</div>;
    return(
        <div className='flex flex-col h-full w-full items-center justify-center'>
        <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
        <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div className='grid grid-cols-2 gap-5'>
            <Input label='Nombre:' name='nombre' type='text' required />
            <Input label='Apellido:' name='apellido' type='text' required />
            <Input label='Documento:' name='identificacion' type='text' required />
            <DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />
            <Input label='Correo:' name='correo' type='email' required />
            <Input label='Contraseña:' name='password' type='password' required />
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={false}
            text='Registrarme'
          />
        </form>
        <span>¿Ya tienes una cuenta?</span>
        <Link to='/auth/login'>
          <span className='text-blue-700'>Inicia sesión</span>
        </Link>
      </div>
    );
}
export default Register;