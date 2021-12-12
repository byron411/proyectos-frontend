import { useMutation, useQuery } from "@apollo/client";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";
import { Enum_TipoObjetivo } from "utils/enums";
import { GET_LIDERES } from "graphql/usuarios/queries";



const CrearProyecto=()=>{
    const {form, formData, updateFormData}=useFormData();
    const[crearProyecto,{data: dataMutation, loading:loadingMutation, error: errorMutation}]=
    useMutation(CREAR_PROYECTO);
    const {data, error, loading}=useQuery(GET_LIDERES);
    const lista=[];
    useEffect(() => {
        console.log('RESULTADO QUERY ',data);
        //console.log('entrear',data.buscarLider[0].nombre)
    }, [data]);

    const submitForm=(e)=>{
        formData.presupuesto=parseFloat(formData.presupuesto);
        e.preventDefault();
        console.log("enviar datos al backedn",formData)

        crearProyecto({variables:formData});
    };


    return(
        <div className='flex flex-col h-full w-full items-center justify-center'>
        <h1 className='text-3xl font-bold my-4'>Crear Proyecto</h1>
        <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div className='grid grid-cols-2 gap-5'>
            <Input label='Nombre:' name='nombre' type='text' required />
            <Input label='Presupuesto' name='presupuesto' type='number' required />
            <Input label='Fecha de inicio:' name='fechaInicio' type='date' required />
            <Input label='Fecha fin:' name='fechaFin' type='date' required />
            <DropDown label='Estado proyecto:' name='estado' required={true} options={Enum_EstadoProyecto}/>
            <DropDown label='Fase proyecto:' name='fase' required={true} options={Enum_FaseProyecto}/>
            
            <Input label='Líder:' name='lider' type='text' required />
            {data &&
            data.buscarLider.map((u)=>{
              console.log('algo',u.nombre);
              lista.push(u.nombre)
            })}
            <DropDown label= 'Líder' name='lider' options={lista}/>
            {/*<h3>Objetivos</h3>
            <Input label='Descripción:' name='descripcion' type='text' />
            <DropDown label='Tipo objetivo:' name='tipo' options={Enum_TipoObjetivo}/>*/}
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={false}
            text='Crear Proyecto'
          />
        </form>
        
      </div>
    );
};
export {CrearProyecto};