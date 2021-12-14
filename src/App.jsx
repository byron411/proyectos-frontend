import React, { useState,useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import Index from 'pages/Index';
import IndexProyectos from 'pages/proyectos/Index';
import Admin from 'pages/Admin';
import IndexUsuarios from 'pages/usuarios';
import 'styles/globals.css';
import 'styles/tabla.css'
import EditarUsuario from 'pages/usuarios/editar';
import AuthLayaout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';
import EditarEstadoUsuario from 'pages/usuarios/editarEstado';
import { CrearProyecto } from 'pages/proyectos/crearProyecto';
import { IndexEstudiante } from 'pages/estudiantes/indexEstudiantes';
import { CrearObjetivo } from 'pages/proyectos/crearObjetivo';
import { EditarProyectos } from 'pages/proyectos/editarProyectos';

// import PrivateRoute from 'components/PrivateRoute';
// const httplink=createHttpLink({
//   uri:"https://servidor-gql-proyectos.herokuapp.com/graphql"
// })

const httplink=createHttpLink({
    //uri:"http://localhost:4000/graphql",
    uri:"https://servidor-gql-proyectos.herokuapp.com/graphql"
    //uri:"https://neklo.herokuapp.com/graphql"
   });
  
   const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem('token'));
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

const client=new ApolloClient({
  //uri:"https://servidor-gql-proyectos.herokuapp.com/graphql",
  cache:new InMemoryCache(),
  link:authLink.concat(httplink),
  
});
function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken]=useState('');

  const setToken=(token)=>{
      setAuthToken(token)
      if (token){
        localStorage.setItem('token',JSON.stringify(token));
      }
      else{
        localStorage.removeItem('token');
      }
  }


   useEffect(() => {
 
    if(authToken){
      const decoded=jwt_decode(authToken);
      setUserData({
        _id:decoded._id,
        nombre:decoded.nombre,
        apellido:decoded.apellido,
        identificacion:decoded.identificacion,
        correo:decoded.correo,
        rol:decoded.rol
      });
      console.log('EL DECODIVFICADOXXXXXXXXXXXXXXXXXXXXXXXX', decoded);
    }
   }, [authToken]);

  return (
    <ApolloProvider client ={client}>
    
    <AuthContext.Provider value={{authToken,setAuthToken,setToken}}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateLayout />}>
              <Route path='' element={<Index />} />
              <Route path='/usuarios' element={<IndexUsuarios />} />
              <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
              <Route path='/usuarios/editarEstado/:_id' element={<EditarEstadoUsuario />} />
              <Route path='admin' element={<Admin />} />
              <Route path='/proyectos' element={<IndexProyectos/>}/>
              <Route path='/proyectos/crear' element={<CrearProyecto/>}/>
              <Route path='/proyectos/crearObjetivo/:_id' element={<CrearObjetivo/>}/>
              <Route path='/proyectos/editarProyecto/:_id' element={<EditarProyectos/>}/>
              <Route path='admin/usuarios' element={<IndexUsuarios />} />
              <Route path='estudiantes' element={<IndexEstudiante/>}/>
            </Route>

            <Route path="/auth" element={<AuthLayaout/>}>
              <Route path='register' element={<Register/>}/>
              <Route path='login' element={<Login/>}/>
            </Route>
          </Routes>
          
        </BrowserRouter>
      </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
