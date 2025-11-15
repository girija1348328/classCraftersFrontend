import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUser,
  deleteUser,
  createUser,
  updateUser,
} from "@/store/slices/userSlice";
import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from "@/store/selectors/userSelectors";
import { fetchAllRole } from "@/store/slices/roleSlice";
import {
  selectRole,
  selectRoleLoading,
  selectRoleError,
} from "@/store/selectors/roleSelectors";

const UsersPage = () => {
  const dispatch = useDispatch();

  // Users
  const users = useSelector(selectUser);
   console.log("Users in UsersPage:", users);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Roles
  const roles = useSelector(selectRole);
 
  const roleLoading = useSelector(selectRoleLoading);
  const roleError = useSelector(selectRoleError);

  // Local UI state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password_hash: "",
    role_id: "",
  });

  // Load all users and roles on mount
  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchAllRole());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password_hash: "",
      role_id: user.role_id || "",
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password_hash: "", role_id: "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, updates: formData }));
    } else {
      dispatch(createUser(formData));
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={handleAdd}
          className="bg-[#557A66] hover:bg-[#466353] text-white px-4 py-2 rounded-lg shadow"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.users && users?.data?.users.length > 0 ? (
                users.data.users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      {roles?.data?.roles.find((r) => r.id === user.role_id)?.name || "—"}
                    </td>
                    <td className="px-6 py-3 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-3 text-center" colSpan="4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
                value={formData.password_hash}
                onChange={(e) =>
                  setFormData({ ...formData, password_hash: e.target.value })
                }
                required={!editingUser}
              />
              {/* Role dropdown */}
              <select
                className="border rounded px-3 py-2"
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role_id: Number(e.target.value),
                  })
                }
                required
              >
                <option value="">Select role</option>
                {roles &&
                  roles?.data?.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#557A66] text-white px-4 py-2 rounded hover:bg-[#466353]"
                >
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
