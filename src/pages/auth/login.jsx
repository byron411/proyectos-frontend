import React, {useEffect} from "react";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login=()=>{
    const navigate=useNavigate();
    const {setToken}=useAuth();
    const {form,formData,updateFormData}=useFormData();
    const [login, {data:dataMutation,loading:mutationLoading,error:mutationError}]=useMutation(LOGIN);
    const submitForm=(e)=>{
        e.preventDefault();
        login({
            variables:formData,
        });
    };

    useEffect(() => {
        console.log('datos mutacion', dataMutation);
        if(dataMutation){
        // if(dataMutation.login.token!=='incorrectpass' && dataMutation.login.token
        // && dataMutation.login.token!=='notuser'){
        //   setToken(dataMutation.login.token);
        //     navigate('/');
        //     //console.log('ESTE ES EL TOKEN', dataMutation.login.token);
        // }
        // else{
        //   console.log('Usuario o contraseña incorrectos');
        //   toast('Usuario o contraseña incorrectos')
        // }
        if(dataMutation.login.token==='incorrectpass'){
          alert('Contraseña incorrecta');
        }
        else if(dataMutation.login.token==='notuser'){
          alert('Usuario no existe');
        }
        else if(dataMutation.login.token){
          setToken(dataMutation.login.token);
             navigate('/');
        }
        
      }
    }, [dataMutation, setToken, navigate]);

    useEffect(() => {
      if(mutationError){
        toast('Ha ocurrido un error');
      }
    }, [mutationError])

    return (
        <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input name='correo' type='email' label='Correo' required={true} />
        <Input name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Iniciar Sesión'
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'>Regístrate</span>
      </Link>
    </div>
    );
} 
export default Login;