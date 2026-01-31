import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getClassroom } from "@/store/slices/classroomSlice";
import { fetchTimetables } from "@/store/slices/timeTableSlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  selectTimetables,
  selectTimetablesLoading,
} from "@/store/selectors/timeTableSelectors";

/* ================= CONSTANTS ================= */

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const PERIODS = [
  { period: 1, label: "09:00 - 09:45" },
  { period: 2, label: "09:45 - 10:30" },
  { period: 3, label: "10:30 - 11:15" },
  { period: 4, label: "11:15 - 12:00" },
  { period: 5, label: "12:00 - 12:45" },
  { period: 6, label: "12:45 - 01:30" },
  { period: 7, label: "01:30 - 02:15" },
  { period: 8, label: "02:15 - 03:00" },
  { period: 9, label: "03:00 - 03:45" },
];

/* ================= COMPONENT ================= */

const StudentTimeTable = () => {
  const dispatch = useDispatch();

  const { classrooms, loading: classroomLoading } = useSelector(
    (state) => state.classroom
  );

  const timetables = useSelector(selectTimetables);
  console.log("timetables:", timetables);
  const loading = useSelector(selectTimetablesLoading);

  const [selectedClassId, setSelectedClassId] = useState("");

  /* ---------- Fetch classrooms ---------- */
  useEffect(() => {
    dispatch(getClassroom());
  }, [dispatch]);

  /* ---------- Fetch timetable ---------- */
  useEffect(() => {
    if (selectedClassId) {
      dispatch(fetchTimetables(selectedClassId));
    }
  }, [selectedClassId, dispatch]);

  /* ---------- Build lookup map: DAY + PERIOD ---------- */
  const timetableMap = useMemo(() => {
    const map = {};

    timetables?.forEach((item) => {
      map[`${item.day}_${item.period}`] = item;
    });

    return map;
  }, [timetables]);

  /* ================= RENDER ================= */

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Weekly Timetable
          </CardTitle>

          {/* Classroom Filter */}
          <Select value={selectedClassId} onValueChange={setSelectedClassId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Classroom" />
            </SelectTrigger>

            <SelectContent>
              {classroomLoading ? (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              ) : (
                classrooms?.map((cls) => (
                  <SelectItem key={cls.id} value={String(cls.id)}>
                    {cls.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading timetable...
            </p>
          ) : !selectedClassId ? (
            <p className="text-sm text-muted-foreground">
              Please select a classroom to view timetable
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left">Time</th>
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="border p-3 text-center font-medium"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {PERIODS.map(({ period, label }) => (
                    <tr key={period}>
                      {/* Time column */}
                      <td className="border p-3 font-semibold bg-muted/50">
                        {label}
                      </td>

                      {DAYS.map((day) => {
                        const data =
                          timetableMap[`${day}_${period}`];

                        return (
                          <td
                            key={day}
                            className={cn(
                              "border p-2 text-center align-top",
                              data
                                ? "bg-background"
                                : "bg-muted/30 text-muted-foreground"
                            )}
                          >
                            {data ? (
                              <div className="space-y-1">
                                <Badge variant="secondary">
                                  {data.subject?.name}
                                </Badge>

                                <div className="text-xs">
                                  Teacher #{data.teacher?.id}
                                </div>
                              </div>
                            ) : (
                              <span>—</span>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTimeTable;
