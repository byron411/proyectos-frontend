import { gql } from "@apollo/client";

const PROYECTOS=gql`
query Proyectos {
  Proyectos {
    lider {
      _id
      nombre
      apellido
    }
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`
export {PROYECTOS};