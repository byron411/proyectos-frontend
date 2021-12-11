import React from 'react';
import { Link, } from "react-router-dom";

const IndexProyectos = () => {
  return (
    <div>
  
    <Link to={`/proyectos/crear`}>CrearProyecto
    <i className='fas fa-file-alt' />
    </Link>
  
  </div>
  );
};

export default IndexProyectos;
