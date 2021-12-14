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
    objetivos {
      descripcion
      tipo
      _id
    }
  }
}
`
const GET_PROYECTO=gql`
query BuscarProyectoById($_id: String!) {
  buscarProyectoById(_id: $_id) {
    _id
    nombre
  nombre
    presupuesto
  presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
    }
  }
}
`
export {PROYECTOS,GET_PROYECTO};