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
import { GET_USUARIO } from "graphql/usuarios/queries";
import { GET_LIDERES } from "graphql/usuarios/queries";


const EditarProyectos=()=>{
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        data:queryData, 
        error:queryError, 
        loading:queryLoading}=useQuery(GET_PROYECTO,{
        variables:{_id},
    });

    const {data,error,loading}=useQuery(GET_LIDERES);
    let lideres={
        lider1:'byr',
        lider2:'gael',
    }
    if(data){

    }
    
    //const [editarEstadoUsuario, {data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_ESTADO_USUARIO);
    const [editarProyecto,{data:mutationData, loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_PROYECTO);
    const submitForm = (e) => {
        e.preventDefault();
        //console.log('FORM DATA', _id, formData);
        let pos=parseInt(formData.lider);
        formData.lider=data.buscarLider[pos]._id;
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

       
        const cambiar=()=>{
            let formato=queryData.buscarProyectoById.fechaInicio;
            let formatofin=queryData.buscarProyectoById.fechaFin;
        var newFormato="";
        let newFormatoFin="";
       
        for(let i=0;i<10;i++){
            //console.log('EL INDEX',formato[i]);
             newFormato=newFormato+formato[i];   
             newFormatoFin=newFormatoFin+formatofin[i];  
        }
        
            
            return {inicio:newFormato, fin:newFormatoFin};
        }
       //console.log('QUERY', queryData.buscarProyectoById.estado);
       let fechas=cambiar();
       //console.log('FORMATOS:',fechas.inicio );
       
      
       
    
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

        <Input 
        label='Fecha de inicio:' 
        name='fechaInicio' 
        type='date' 
        //defaultValue='2021-12-15'
       defaultValue={fechas.inicio}
        required />
        
        <Input 
        label='Fecha fin:' 
        name='fechaFin' 
        type='date' 
        //defaultValue='2021-12-15'
       defaultValue={fechas.fin}
        required />
       
       {data ?           
            <DropDown label= 'Líder'  name='lider' 
            //defaultValue={queryData.buscarProyectoById.lider.nombre}
             options={data &&
            data.buscarLider.map((i)=>{
              return(
                i.nombre +' '+ i.apellido
              );
            })}/>:<div>Se cargó primero el DropDown que el query</div>}
        
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