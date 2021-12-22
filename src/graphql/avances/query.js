import {gql} from '@apollo/client'

const AVANCES = gql`
query Avances {
    Avances {
      fecha
      descripcion
      _id
      observaciones
      creadoPor {
        _id
        nombre
        apellido
      }
      proyecto {
        _id
      }
    }
  }
`;
export {AVANCES};