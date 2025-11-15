import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRole,
  deleteRole,
  createRole,
  updateRole,
} from "@/store/slices/roleSlice";
import {
  selectRole,
  selectRoleLoading,
  selectRoleError,
} from "@/store/selectors/roleSelectors";

const RolesPage = () => {
  const dispatch = useDispatch();

  // Roles state from Redux
  const roles = useSelector(selectRole);
  const loading = useSelector(selectRoleLoading);
  const error = useSelector(selectRoleError);

  // Local UI state
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Load all roles on mount
  useEffect(() => {
    dispatch(fetchAllRole());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      dispatch(deleteRole(id));
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || "",
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingRole(null);
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      dispatch(updateRole({ id: editingRole.id, updates: formData }));
    } else {
      dispatch(createRole(formData));
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
        <button
          onClick={handleAdd}
          className="bg-[#557A66] hover:bg-[#466353] text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Role
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading roles...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles?.data?.roles && roles.data.roles.length > 0 ? (
                roles?.data?.roles.map((role) => (
                  <tr key={role.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{role.name}</td>
                    <td className="px-6 py-3">{role.description || "—"}</td>
                    <td className="px-6 py-3 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(role)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-3 text-center" colSpan="3">
                    No roles found.
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
              {editingRole ? "Edit Role" : "Add Role"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Role Name"
                className="border rounded px-3 py-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="border rounded px-3 py-2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
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
                  {editingRole ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage;
