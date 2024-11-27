import React, { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddRoleForm from './AddRoleForm';
import {addRecentLog} from "../../customHooks/useSetRecentLog.js"

function RoleTable() {
    const [error, setError] = useState(null);
    const [role, setRole] = useState([]);
    const [addRole, setAddRole] = useState(false);
    const[editRole, setEditRole] = useState();
    const[id, setId] = useState();
    const [editPermissions, setEditPermissions] = useState();

    useEffect(() => {
        try {
            const roles = JSON.parse(localStorage.getItem('roles')) || [];
            setRole(roles); 
        } catch (error) {
            setError(error.message);
        }
    }, [addRole]);

    const handleDelete = (id) => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        const updatedRoles = roles.filter(role => role.id !== id);
        const deletedRole = roles.find(role => role.id === id);
        localStorage.setItem('roles', JSON.stringify(updatedRoles));
        setRole(updatedRoles);
        if(deletedRole){
            const indianTime = new Date()
                .toLocaleString("en-IN", { timeZone: "IST" })
                .split(", ")[1];
            const logMessage = [indianTime, `Delete ${deletedRole.role} from role management`];
            addRecentLog(logMessage);
        }
    }
    const handleClose = () => {
        setEditRole("");
        setEditPermissions("");
        setId("")
        setAddRole(false);
    } 
    const handleEdit = (eR, eP, eI) => {
        setEditRole(eR);
        setEditPermissions(eP);
        setId(eI);
        setAddRole(true)
    }

    return (
        <div className="h-containers-height bg-third-background relative">
            <div className={`${addRole ? "flex" : "hidden"} absolute w-full flex justify-center items-center h-containers-height backdrop-blur-lg`}>
            <AddRoleForm editRole={editRole} editId={id} editPermissions={editPermissions} onClick={handleClose}/>
            </div>
            <div>
                {/* Main Content */}
                <main className="flex-grow p-1 md:p-6 bg-third-background text-white">
                    {/* Employee List Heading */}
                    <div className="flex justify-between items-center mb-8 w-full xl:w-[calc(100%-25rem)] mx-auto">
                        <div className="flex  justify-between w-full">
                            <div className="text-gray-600">Total Count: {role.length}</div>
                            
                            <button
                            onClick={() => setAddRole(true)} 
                            className="bg-green-500 text-white py-1 px-3 rounded">Add Role</button>
                        
                        </div>
                    </div>

                    {/* Error message */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {/* Employee Table */}
                    <div className="overflow-auto rounded-md md:rounded-xl w-full xl:w-[calc(100%-25rem)] mx-auto border">
                        
                        <table className="table-auto w-full text-left border-collapse rounded-xl cursor-pointer text-xs md:text-base">
                            <thead className="bg-secondry-background rounded-xl">
                                <tr>
                                    <th className="border-b md:p-2 cursor-pointer p-1">ID</th>
                                    <th className="border-b md:p-2 p-1">Role</th>
                                    <th className="border-b md:p-2">Permissions</th>
                                    <th className="border-b md:p-2">Created At</th>
                                    <th className="border-b md:p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {role.length > 0 ? (
                                    role.map((role) => (
                                        <tr key={role.id}>
                                            <td className="border-b p-1 md:p-3">{role.id}</td>
                                            
                                            <td className="border-b p-1 md:p-3">{role.role}</td>
                                            <td className="border-b p-1 md:p-3">
                                                <div className='flex flex-wrap gap-1'>
                                                    {role.permissions.map((permission) => (
                                                        <span key={permission} className={`p-1 rounded-lg 
                                                        ${permission === 'read' ? 'bg-blue-500' : permission === 'write' ? 'bg-green-500' : 'bg-red-500'}`}>
                                                            {permission}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="border-b md:p-3 p-1">{role.createdAt}</td>
                                            <td className="border-b md:p-3">
                                                <div className='flex space-x-1 md:space-x-4'>
                                                <div onClick={() => handleEdit(role.role, role.permissions, role.id)}>
                                                <MdModeEdit className='md:text-xl text-lg'/>
                                                </div>
                                                <div onClick={() => handleDelete(role.id)}>
                                                <MdDelete className='md:text-xl text-lg text-red-500'/>
                                                </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-3">No Role is found, create One</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RoleTable;