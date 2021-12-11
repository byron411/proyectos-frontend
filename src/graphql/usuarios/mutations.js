import {gql} from '@apollo/client';

const EDITAR_USUARIO=gql`
mutation ModificarUsuario($_id: String!, $nombre: String, $apellido: String, $identificacion: String, $correo: String, $estado: Enum_EstadoUsuario, $rol: Enum_Rol) {
    modificarUsuario(_id: $_id, nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, estado: $estado, rol: $rol) {
        _id
        nombre
        apellido
        identificacion
        correo
        estado
        rol
    }
  }
  `
  const ELIMINAR_USUARIO=gql`
  mutation EliminarUsuario($_id: String!) {
    eliminarUsuario(_id: $id) {
      nombre
    }
  }
  `
  const EDITAR_ESTADO_USUARIO=gql`
  mutation ModificarUsuario($_id: String!, $estado: Enum_EstadoUsuario) {
    modificarUsuario(_id: $_id, estado: $estado) {
      _id
      nombre
        estado
        
    }
  }
  `
  export {EDITAR_USUARIO,ELIMINAR_USUARIO, EDITAR_ESTADO_USUARIO};