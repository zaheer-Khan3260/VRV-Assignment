import React from "react";
import { FaUserShield } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const UserCard = ({
  id,
  name,
  email,
  role,
  isActive,
  onEdit,
  onDelete,
  onToggleStatus,
  permissions
}) => {

  return (
    <div className="bg-primary-background rounded-lg shadow-xl shadow-slate-900 p-4 w-72 min-w-60 mx-auto cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
        <h2 className="text-xl font-bold text-gray-300">{name}</h2>
        <p className="text-sm text-primary-color">{email}</p>
        </div>
        <span
          className={`text-sm font-semibold py-1 px-3 rounded-full ${
            isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="flex items-center text-gray-500 mt-2">
        <FaUserShield className="mr-2 text-blue-500" />
        <span>{role}</span>
      </div>

      {/* Permissions Section */}
      <div className="mt-4">
        <ul className="mt-1 flex space-x-2">
          {
            permissions.map((data) => (
          <li
            className={`px-2 py-1 rounded-md text-sm ${
              data === "read" ? "bg-green-100 text-green-600" :
              data === "write" ? "bg-yellow-100 text-yellow-600" :
              "bg-red-100 text-red-600"
            }`}
          >
            {data}
          </li>
          ))
          }
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex space-x-2 items-center">
         <MdModeEdit className='text-xl' onClick={() => onEdit(id)}/>     
         <MdDelete className='text-xl text-red-500' onClick={() => onDelete(id)}/>
         </div>
        <button
          onClick={() => onToggleStatus(id)}
          className={`py-2 px-4 rounded-lg transition duration-300 ${
            isActive ? "bg-gray-300 text-gray-700" : "bg-green-500 text-white"
          }`}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
