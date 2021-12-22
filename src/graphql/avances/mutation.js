import {gql} from '@apollo/client';

const CREAR_AVANCE=gql`
mutation CrearAvance($descripcion: String!, $proyecto: String!, $creadoPor: String!) {
    crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
      fecha
    }
  }
`;

export {CREAR_AVANCE};