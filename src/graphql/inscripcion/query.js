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
const INSCRIPCIONES_BY_ESTUDIANTE=gql`
query InscripcionByEstudiante($estudiante: String!) {
  inscripcionByEstudiante(estudiante: $estudiante) {
    estado
    _id
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
export {INSCRIPCIONES,INSCRIPCIONES_BY_ESTUDIANTE};