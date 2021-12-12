import {gql} from '@apollo/client';

const GET_USUARIOS=gql`
query Usuarios {
    Usuarios {
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

const GET_USUARIO=gql`
query BuscarUsuario($_id: String!) {
  buscarUsuario(_id: $_id) {
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
const GET_LIDERES=gql`
query BuscarLider {
  buscarLider {
    nombre
    apellido
    _id
  }
}
`
export {GET_USUARIOS, GET_USUARIO,GET_LIDERES};