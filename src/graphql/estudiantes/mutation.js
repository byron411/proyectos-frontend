import {gql} from '@apollo/client';

const APROBAR_INSCRIPCION=gql`
mutation AprobarInscripcion($_id: String!) {
    aprobarInscripcion(_id: $_id) {
      estado
    }
  }
`
const RECHAZAR_INSCRIPCION=gql`
mutation RechazarInscripcion($_id: String!) {
    rechazarInscripcion(_id: $_id) {
      estado
    }
  }
`
export {APROBAR_INSCRIPCION,RECHAZAR_INSCRIPCION};