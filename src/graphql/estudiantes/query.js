import {gql} from '@apollo/client';

const BUSCAR_ESTUDIANTES=gql`
query BuscarEstudiante {
    buscarEstudiante {
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
export {BUSCAR_ESTUDIANTES};