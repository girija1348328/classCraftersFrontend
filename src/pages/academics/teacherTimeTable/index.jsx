import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTimetablesByTeacher } from "@/store/slices/timeTableSlice";
import { getAllStaffRegistrations } from "@/store/slices/staffSlice";

import { selectTimetablesByTeacher } from "@/store/selectors/timeTableSelectors";
import { selectStaffRegistrations } from "@/store/selectors/staffSelectors";

/* ✅ MUST MATCH API */
const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

/* ✅ Time formatter */
const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const TeacherTimeTable = () => {
  const dispatch = useDispatch();

  const staffList = useSelector(selectStaffRegistrations);
  const timetables = useSelector(selectTimetablesByTeacher);

  const [selectedStaffId, setSelectedStaffId] = useState("");

  /* -------------------- Fetch staff list -------------------- */
  useEffect(() => {
    dispatch(getAllStaffRegistrations());
  }, [dispatch]);

  /* -------------------- Fetch timetable by teacher -------------------- */
  useEffect(() => {
    if (selectedStaffId) {
      dispatch(fetchTimetablesByTeacher(selectedStaffId));
    }
  }, [dispatch, selectedStaffId]);

  /* -------------------- Group timetable by period & day -------------------- */
  const { timetableMap, periods } = useMemo(() => {
    const map = {};
    const periodSet = new Set();

    (timetables || []).forEach((item) => {
      periodSet.add(item.period);

      if (!map[item.period]) {
        map[item.period] = {};
      }

      map[item.period][item.day] = item;
    });

    return {
      timetableMap: map,
      periods: Array.from(periodSet).sort((a, b) => a - b),
    };
  }, [timetables]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Teacher Timetable</h1>

      {/* ================= Teacher Filter ================= */}
      <div className="max-w-sm">
        <label className="block mb-1 font-medium">Select Teacher</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedStaffId}
          onChange={(e) => setSelectedStaffId(e.target.value)}
        >
          <option value="">-- Select Teacher --</option>
          {staffList?.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.user?.name || staff.user?.fullName || "Unnamed Staff"}
            </option>
          ))}
        </select>
      </div>

      {/* ================= Empty States ================= */}
      {!selectedStaffId && (
        <p className="text-gray-500">
          Please select a teacher to view timetable.
        </p>
      )}

      {selectedStaffId && periods.length === 0 && (
        <p className="text-gray-500">
          No timetable found for this teacher.
        </p>
      )}

      {/* ================= Timetable Grid ================= */}
      {selectedStaffId && periods.length > 0 && (
        <div className="overflow-x-auto border rounded">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-center">Period</th>
                {DAYS.map((day) => (
                  <th key={day} className="border px-3 py-2 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {periods.map((period) => (
                <tr key={period}>
                  <td className="border px-3 py-2 font-medium text-center">
                    {period}
                  </td>

                  {DAYS.map((day) => {
                    const entry = timetableMap?.[period]?.[day];

                    return (
                      <td
                        key={day}
                        className="border px-2 py-2 align-top text-center"
                      >
                        {entry ? (
                          <div className="space-y-1">
                            <p className="font-semibold">
                              {entry.subject?.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {entry.class?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTime(entry.startTime)} -{" "}
                              {formatTime(entry.endTime)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherTimeTable;
