import {gql} from '@apollo/client'

const INSCRIPCIONES = gql`
query Inscripciones {
    Inscripciones {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`
export {INSCRIPCIONES};