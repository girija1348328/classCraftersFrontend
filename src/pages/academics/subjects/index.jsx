import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  getAllSubjects,
  createSubject,
  getClassroom,
} from "@/store/slices/classRoomSlice";

import {
  selectSubjects,
  selectClassrooms,
} from "@/store/selectors/classRoomSelectors";

const Subjects = () => {
  const dispatch = useDispatch();

  const subjects = useSelector(selectSubjects);
  const classrooms = useSelector(selectClassrooms);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- Fetch Subjects + Classrooms ---------------- */
  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getClassroom());
  }, [dispatch]);

  /* ---------------- Create Subject ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !classroomId) {
      toast.error("Subject name, code and classroom are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const subjectData = { name, code };

      await dispatch(
        createSubject({
          subjectData,
          classroomId,
        })
      ).unwrap();

      toast.success("Subject created successfully");

      setName("");
      setCode("");
      setClassroomId("");
      setShowModal(false);

      dispatch(getAllSubjects());
    } catch (error) {
      toast.error(error || "Failed to create subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= Header ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Subjects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Subject
        </button>
      </div>

      {/* ================= Subjects Table ================= */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Subject</th>
              <th className="border px-3 py-2">Code</th>
              <th className="border px-3 py-2">Classroom</th>
              <th className="border px-3 py-2">Teacher</th>
              <th className="border px-3 py-2">Email</th>
            </tr>
          </thead>

          <tbody>
            {subjects?.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No subjects found
                </td>
              </tr>
            )}

            {subjects?.map((subject, index) => (
              <tr key={subject.id}>
                <td className="border px-3 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border px-3 py-2 font-medium">
                  {subject.name}
                </td>
                <td className="border px-3 py-2">
                  {subject.code}
                </td>
                <td className="border px-3 py-2">
                  {subject.classroom?.name || "—"}
                </td>
                <td className="border px-3 py-2">
                  {subject.classroom?.teacher?.name || "—"}
                </td>
                <td className="border px-3 py-2">
                  {subject.classroom?.teacher?.email || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Create Subject Modal ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Create Subject
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Subject Code */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              {/* Classroom Select */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Classroom
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={classroomId}
                  onChange={(e) => setClassroomId(e.target.value)}
                >
                  <option value="">Select Classroom</option>
                  {classrooms?.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
