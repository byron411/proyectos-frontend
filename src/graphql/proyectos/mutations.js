import {gql} from '@apollo/client';

const CREAR_PROYECTO=gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $estado: Enum_EstadoProyecto!, $fase: Enum_FaseProyecto!, $lider: String!, $objetivos: [crearObjetivo]) {
    crearProyecto(nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider, objetivos: $objetivos) {
      nombre
      _id
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        _id
      }
      objetivos {
        _id
        tipo
      }
    }
  }
  `
  const CREAR_OBJETIVO=gql`
  mutation CrearObjetivo($idProyecto: String!, $descripcion: String!, $tipo: Enum_TipoObjetivo!) {
    crearObjetivo(idProyecto: $idProyecto, descripcion: $descripcion, tipo: $tipo) {
      nombre
    }
  }
  `
  const EDITAR_PROYECTO=gql`
  mutation ModificarProyecto($id: String!, $nombre: String, $presupuesto: Float, $fechaInicio: Date, $fechaFin: Date, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $lider: String) {
    modificarProyecto(_id: $id, nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider) {
      nombre
      _id
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombre
        _id
      }
    }
  }
  `
  export {CREAR_PROYECTO,CREAR_OBJETIVO,EDITAR_PROYECTO};