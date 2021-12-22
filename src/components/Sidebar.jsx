import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />     
      
      <SidebarRoute to='/estudiantes' title='Estudiantes' icon='fas fa-user' />
      <SidebarRoute to='/allProjects' title='Proyectos' icon='fas fa-archive' />
      <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
      <SidebarRoute to='/inscripciones' title='Inscripciones' icon='fas fa-edit' />
      </PrivateComponent>
      <PrivateComponent roleList={['LIDER']}>
      <SidebarRoute to='/misProyectos' title='Mis proyectos' icon='fas fa-archive' />
      </PrivateComponent>
      <PrivateComponent roleList={['ESTUDIANTE']}>
      <SidebarRoute to='/misInscripciones' title='Mis Inscripciones' icon='fas fa-archive' />
      </PrivateComponent>
      <SidebarRoute to='/admin' title='Admin' icon='fas fa-tools' />
      <PrivateComponent roleList={['ADMINISTRADOR']}>
      <SidebarRoute to='/admin/usuarios' title='Usuarios' icon='fas fa-user' />
      <SidebarRoute to='/admin/proyectos' title='Proyectos' icon='fas fa-archive' />
      </PrivateComponent>
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='neklo.png' alt='Logo' className='h-16'/>
      
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
