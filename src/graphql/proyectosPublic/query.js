import { gql } from "@apollo/client";

const GET_PROYECTOS_BY_LIDER=gql`
query BuscarProyectosByLider($_id: String!) {
    buscarProyectosByLider(lider: $_id) {
      _id
      nombre
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
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`
export {GET_PROYECTOS_BY_LIDER};