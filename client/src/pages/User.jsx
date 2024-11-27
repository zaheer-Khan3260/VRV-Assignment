import React, { useState, useEffect } from 'react'
import { CiMedicalCross } from "react-icons/ci";
import { FiSearch } from 'react-icons/fi';

import UserCard from "../components/userManagment/UserCard.jsx"
import AddUserForm from '../components/userManagment/AddUserForm.jsx';
import { addRecentLog } from '../customHooks/useSetRecentLog.js';

function User() {
  const[addUser, setAddUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] =  useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(usersData);
  }, [addUser]);

  const handleDelete = (id) => {
    const deletedUser = users.find(user => user.id === id);
    if(deletedUser){
      const indianTime = new Date().toLocaleString('en-IN', { timeZone: 'IST' }).split(", ")[1];
      addRecentLog([indianTime, `${deletedUser.name} is Deleted`])
    }
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  }

  const handleEdit = (id) => {
    setId(id);
    setAddUser(true)
  }
  const handleClose= () => {
    setId("");
    setAddUser(false);
  }

  const toggleStatus = (id) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const toggleUser = usersData.find(user => user.id === id);
    if(toggleUser){
      const indianTime = new Date().toLocaleString('en-IN', { timeZone: 'IST' }).split(", ")[1];
      addRecentLog([indianTime, `${toggleUser.name} Status updated`]);
    }
    const updatedUsers = usersData.map(user => user.id === id ? { ...user, isActive: !user.isActive } : user);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  }

  return (
    <div className="h-screen md:h-containers-height bg-third-background relative w-full overflow-auto scrollbar-hidden">
        <div className={`${addUser ? "flex" : "hidden"}
        absolute w-full flex justify-center items-center h-containers-height backdrop-blur-lg`}>
        <AddUserForm editId={id} onClick={handleClose}/>
        </div>
        <div>
            <main className="flex-grow md:p-6 pt-6 bg-third-background text-white">
                <div className="flex justify-between items-center mb-4 px-24 pr-28 w-full xl:w-[calc(100%-28rem)] md:mx-auto">
                    <div className="flex  justify-between w-full px-4 md:px-0">
                        <div className="text-gray-600">Total Count: {users.length}</div>
                        <button
                        onClick={() => setAddUser(true)} 
                        className="bg-blue-500 text-white py-1 px-3 rounded">
                            Add Users
                        </button>
                    </div>
                </div>
                <div className="overflow-auto rounded-xl w-full 2xl:w-[calc(100%-28rem)] mx-auto flex flex-wrap justify-center xl:justify-start gap-4 md:p-3 md:pl-8 xl:pl-20">
                    <div className="w-full flex justify-end mb-4 mr-24">
                        <div className="relative">
                            <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="bg-gray-800 text-white rounded-lg px-10 py-2 focus:outline-none w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    {
                        users.filter((user) =>
                            user.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((data) => (
                            <div key={data.key} className='mb-5 rounded-xl'>
                                <UserCard {...data} onDelete={handleDelete} onToggleStatus={toggleStatus} onEdit={handleEdit}/>
                            </div>
                        ))
                    }
                    <div className="bg-primary-background flex justify-center flex-col items-center
                     rounded-lg border border-dashed w-72 h-52 cursor-pointer"
                     onClick={() => setAddUser(true)}
                     >
                    <CiMedicalCross className='text-7xl'/>
                      {
                        users.length === 0 ? (
                          <div>No User Found</div>
                        ) : null
                      }
                    <h2>Add Users</h2>
                    </div>
                </div>
            </main>
        </div>
    </div>
);
}
export default User;