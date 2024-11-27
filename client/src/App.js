import './App.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Sidebar/Navbar.jsx';
import { useEffect } from 'react';
import userData from './components/data/user.data.json';
import roleData from './components/data/role.data.json';

function App() {
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.length === 0) {
      localStorage.setItem('users', JSON.stringify(userData));
    } else {
      const newUsers = userData.filter(user => !existingUsers.some(existingUser => existingUser.id === user.id));
      localStorage.setItem('users', JSON.stringify([...existingUsers, ...newUsers]));
    }

    const existingRoles = JSON.parse(localStorage.getItem('roles')) || [];
    if (existingRoles.length === 0) {
      localStorage.setItem('roles', JSON.stringify(roleData));
    } else {
      const newRoles = roleData.filter(role => !existingRoles.some(existingRole => existingRole.id === role.id));
      localStorage.setItem('roles', JSON.stringify([...existingRoles, ...newRoles]));
    }
  }, []);

  return (
    <div className="flex bg-primary-background w-full">
      <Sidebar/>
      <div className='w-full'>
      <div className='hidden md:block'>
      <Navbar/>
      </div>
      <Outlet/>
      </div>
    </div>
  );
}

export default App;
