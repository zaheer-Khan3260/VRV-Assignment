import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../helpers/Button.jsx";
import Input from "../helpers/Input.jsx";
import { addRecentLog } from "../../customHooks/useSetRecentLog.js";
import { v4 as uuidv4 } from "uuid";

function AddRoleForm({ onClick, editId, editRole, editPermissions }) {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editRole) {
      setRole(editRole);
    }
    if (editPermissions) {
      setPermissions(editPermissions);
    }
  }, [editRole, editPermissions]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter((permission) => permission !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      setError("Role field is required.");
      return;
    }
    if (permissions.length === 0) {
      setError("Please select at least one permission.");
      return;
    }
    setError("");
    const id = editId ? editId : uuidv4().substring(0, 4);
    const createdAt = new Date().toISOString().split("T")[0];
    const formData = {
      role,
      permissions,
      id,
      createdAt,
    };
    const roles = JSON.parse(localStorage.getItem("roles")) || [];
    if (editRole) {
      const existingRole = roles.find((role) => role.id === editId);

      if (existingRole) {
        if (
          existingRole.role !== role ||
          existingRole.permissions.join() !== permissions.join()
        ) {
          const updatedRoles = roles.map((role) =>
            role.id === editId ? formData : role
          );
          localStorage.setItem("roles", JSON.stringify(updatedRoles));
          const indianTime = new Date()
            .toLocaleString("en-IN", { timeZone: "IST" })
            .split(", ")[1];

          addRecentLog([indianTime, `${formData.role} role updated`]);
        }
      } else {
        roles.push(formData);
        localStorage.setItem("roles", JSON.stringify(roles));
        const indianTime = new Date()
          .toLocaleString("en-IN", { timeZone: "IST" })
          .split(", ")[1];

        addRecentLog([indianTime, `${formData.role} role added.`]);
      }
    } else {
      const existingRole = roles.find((role) => role.role === formData.role);
      if (!existingRole) {
        roles.push(formData);
        localStorage.setItem("roles", JSON.stringify(roles));
        const indianTime = new Date()
          .toLocaleString("en-IN", { timeZone: "IST" })
          .split(", ")[1];
        addRecentLog([indianTime, `${formData.role} role added.`]);
      } else {
        setError("Role already exists.");
      }
    }
    setRole("");
    setPermissions([]);
    onClick();
  };

  return (
    <div className="w-[20rem] h-auto  border rounded-xl p-4 bg-secondry-background">
      <div className="w-full flex justify-between items-center text-white mb-5">
        <h2 className="text-2xl text-center">Add Role</h2>
        <RxCross2
          aria-label="Close form"
          className="text-xl cursor-pointer"
          onClick={onClick}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Role"
          isImportant="true"
          ClassName="mb-5"
          value={role}
          onChange={handleRoleChange}
        />
        <div className="w-full mb-7">
          <label className=" pl-1 text-primary-color" htmlFor="permissions">
            Permissions <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap cursor-pointer mt-4 ml-2">
            <div className="mr-2 flex justify-center items-center">
              <input
                type="checkbox"
                id="Read"
                name="permissions"
                value="read"
                checked={permissions.includes("read")}
                onChange={handlePermissionChange}
                className="w-4 h-4"
              />
              <label className="ml-3 text-primary-color" htmlFor="read">
                Read
              </label>
            </div>
            <div className="mr-2 flex justify-center items-center">
              <input
                type="checkbox"
                id="Write"
                name="permissions"
                value="write"
                checked={permissions.includes("write")}
                onChange={handlePermissionChange}
                className="w-4 h-4"
              />
              <label className="ml-3 text-primary-color" htmlFor="write">
                Write
              </label>
            </div>
            <div className="mr-2 flex justify-center items-center">
              <input
                type="checkbox"
                id="Delete"
                name="permissions"
                value="delete"
                checked={permissions.includes("delete")}
                onChange={handlePermissionChange}
                className="w-4 h-4"
              />
              <label className="ml-3 text-primary-color" htmlFor="delete">
                Delete
              </label>
            </div>
          </div>
        </div>
        <div className="w-full text-right">
          <Button
            text={editRole ? "Update" : "Save"}
            ClassName="w-[5rem] py-0"
          />
        </div>
      </form>
    </div>
  );
}

export default AddRoleForm;
