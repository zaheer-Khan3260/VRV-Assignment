import React, {useState, useEffect} from 'react'
import RecentLogContainer from '../components/dashboard/RecentLogContainer';

function Dashboard() {
  const [greeting, setGreeting] = React.useState('');

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours >= 12 && hours < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening'); // Added condition for evening
    }
  }, []);

  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);

  useEffect(() => {
    const fetchCounts = () => {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const roles = JSON.parse(localStorage.getItem('roles')) || [];

        setUserCount(users.length);
        setRoleCount(roles.length);

        const activeUsers = users.filter(user => user.isActive);
        const inactiveUsers = users.filter(user => !user.isActive);

        setActiveUsersCount(activeUsers.length);
        setInactiveUsersCount(inactiveUsers.length);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className='h-screen md:h-containers-height w-full bg-[#1F2229] p-4 md:p-8'>
      <div>
        <h1 className='text-white text-xl md:text-3xl font-bold'>Welcome to the Dashboard!</h1>
        <p className='text-gray-300 text-lg md:text-xl font-semibold mt-2'>{greeting}, <span className='text-lg'>Admin</span></p>
      </div>
      <div className='mt-2 w-full px-0 md:px-4 pt-8'>
      <RecentLogContainer/>
      </div>
    </div>
  )
}

export default Dashboard