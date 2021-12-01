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
  export {EDITAR_USUARIO};