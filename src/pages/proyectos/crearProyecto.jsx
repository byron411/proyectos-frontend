import { useMutation, useQuery } from "@apollo/client";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import React, {useEffect} from "react";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";
import { GET_LIDERES } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PrivateRoute from "components/PrivateRouter";


const CrearProyecto=()=>{
    const {form, formData, updateFormData}=useFormData();
    const[crearProyecto,{data: dataMutation, loading:loadingMutation, error: errorMutation}]=
    useMutation(CREAR_PROYECTO);
    const {data, error, loading}=useQuery(GET_LIDERES);
    
    useEffect(() => {
        console.log('RESULTADO QUERY ',data);
       
        //console.log('entrear',data.buscarLider[0].nombre)
    }, [data]);

    useEffect(() => {
      if(dataMutation){
          toast.success('Proyecto creado');
      }
      
      }, [dataMutation]);

      useEffect(() => {
        if (errorMutation){
            toast.error('Error creando proyecto');
        }
    }, [errorMutation]);

    const submitForm=(e)=>{
        formData.presupuesto=parseFloat(formData.presupuesto);
        let pos=parseInt(formData.lider);
        console.log('posicion lider',data.buscarLider[pos].nombre);
        formData.lider=data.buscarLider[pos]._id;
        e.preventDefault();
        console.log("enviar datos al backedn",formData)

        crearProyecto({variables:formData});
    };


    return(
      <PrivateRoute roleList={["ADMINISTRADOR"]}>
        <div className='flex flex-col h-full w-full items-center justify-center p-10'>
        <Link to='/admin/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
        <h1 className='text-3xl font-bold my-4'>Crear Proyecto</h1>
        <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div className='grid grid-cols-2 gap-5'>
            <Input label='Nombre:' name='nombre' type='text' required />
            <Input label='Presupuesto' name='presupuesto' type='number' required />
            <Input label='Fecha de inicio:' name='fechaInicio' type='date' required />
            <Input label='Fecha fin:' name='fechaFin' type='date' required />
            <DropDown label='Estado proyecto:' name='estado' required={true} options={Enum_EstadoProyecto}/>
            <DropDown label='Fase proyecto:' name='fase' required={true} options={Enum_FaseProyecto}/>
            
            
            {data ?           
            <DropDown label= 'Líder' required name='lider' options={data &&
            data.buscarLider.map((i)=>{
              return(
                i.nombre +' '+ i.apellido
              );
            })}/>:<div>Se cargó primero el DropDown que el query</div>}
            {/*<h3>Objetivos</h3>
            <Input label='Descripción:' name='descripcion' type='text' />
            <DropDown label='Tipo objetivo:' name='tipo' options={Enum_TipoObjetivo}/>*/}
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={loadingMutation}
            text='Crear Proyecto'
          />
        </form>
        
      </div>
      </PrivateRoute>
    );
};
export {CrearProyecto};