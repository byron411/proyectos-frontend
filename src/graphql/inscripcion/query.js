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
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
      avances {
        _id
        fecha
        descripcion
        creadoPor {
          _id
          nombre
          apellido
        }
        observaciones
      }
      fase
      fechaInicio
      fechaFin
    }
    estudiante {
      _id
      nombre
      apellido
    }
  }
}
`
const AVANCE_BY_IDPROYECTO=gql`
query FiltrarAvance($idProyecto: String!) {
  filtrarAvance(idProyecto: $idProyecto) {
    descripcion
    _id
    fecha
    observaciones
    creadoPor {
      _id
      nombre
      apellido
    }
  }
}
`;

export {INSCRIPCIONES,INSCRIPCIONES_BY_ESTUDIANTE,AVANCE_BY_IDPROYECTO};