import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../helpers/Button.jsx";
import Input from "../helpers/Input.jsx";
import { v4 as uuidv4 } from "uuid";
import { addRecentLog } from "../../customHooks/useSetRecentLog.js";

function AddUserForm({ onClick, editId }) {
  const [error, setError] = useState({
    name: "",
    email: "",
    role: "",
    user: "",
  });
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [],
    id: uuidv4().substring(0, 6),
    createdAt: new Date().toISOString(),
    isActive: true,
  });

  useEffect(() => {
    const rolesData = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(rolesData);

    if (editId) {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      const userToEdit = usersData.find((user) => user.id === editId);
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [editId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      permissions:
        name === "role"
          ? roles.find((r) => r.role === value)?.permissions || []
          : prevData.permissions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    setError({});

    if (!formData.name) {
      setError((prevError) => ({ ...prevError, name: "Name is required" }));
      hasError = true;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Valid email is required",
      }));
      hasError = true;
    }
    if (!formData.role) {
      setError((prevError) => ({ ...prevError, role: "Role is required" }));
      hasError = true;
    }

    if (!hasError) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      let logMessage = "";
      if (editId) {
        const userIndex = users.findIndex((user) => user.id === editId);
        if (userIndex !== -1) {
          users[userIndex] = formData;
          const indianTime = new Date()
            .toLocaleString("en-IN", { timeZone: "IST" })
            .split(", ")[1];

          logMessage = [indianTime, `${formData.name} is Updated`];
        }
      } else {
        if (users.some((user) => user.email === formData.email)) {
          setError((prevError) => ({
            ...prevError,
            user: "User with this email already exists",
          }));
          return;
        }
        users.push({ ...formData, id: uuidv4().substring(0, 6) });
        const indianTime = new Date()
          .toLocaleString("en-IN", { timeZone: "IST" })
          .split(", ")[1];

        logMessage = [indianTime, `${formData.name} is Added`];
      }

      localStorage.setItem("users", JSON.stringify(users));
      addRecentLog(logMessage);
      setFormData({ name: "", email: "", role: "", permissions: [] });
      onClick();
    }
  };

  return (
    <div className="w-[20rem] h-auto border rounded-xl p-4 bg-primary-background">
      <div className="w-full flex justify-between items-center text-white mb-2">
        <h2 className="text-2xl text-center">Add User</h2>
        <RxCross2
          aria-label="Close form"
          className="text-xl cursor-pointer"
          onClick={onClick}
        />
      </div>
      {Object.values(error).map(
        (err, idx) =>
          err && (
            <div key={idx} className="text-red-500 mb-2 text-center">
              {err}
            </div>
          )
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          ClassName="mb-2"
          name="name"
          isImportant="true"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          type="email"
          ClassName="mb-2"
          name="email"
          isImportant="true"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="w-full mb-4">
          <label className="pl-1 text-primary-color" htmlFor="role">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            className="w-full mt-2 p-2 rounded-xl border outline-none"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option>Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full text-right">
          <Button text={editId ? "Update" : "Add"} ClassName="w-[5rem] py-0" />
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
