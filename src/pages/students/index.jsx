"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchStudents,
    addStudent,
    updateStudent,
} from "../../store/slices/studentSlice"; // adjust path
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { selectStudents } from "../../store/selectors/studentSelectors";

export default function StudentRegistration() {
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    console.log("Students in StudentRegistration:", students);

    const [form, setForm] = useState({
        // name: "",
        // email: "",
        user_id: "",
        institution_id: "",
        phase_id: "",
        subgroup_id: "",
    });

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: ["user_id", "institution_id", "phase_id", "subgroup_id"].includes(name)
                ? Number(value)   // convert to number
                : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addStudent(form)).unwrap();
            alert("Student added successfully!");
            setForm({
                // name: "",
                // email: "",
                user_id: "",
                institution_id: "",
                phase_id: "",
                subgroup_id: "",
            });
        } catch {
            alert("Failed to add student.");
        }
    };

    const handleUpdate = async (id, field, value) => {
        try {
            await dispatch(updateStudent({ id, data: { [field]: value } })).unwrap();
            alert("Student updated!");
        } catch {
            alert("Update failed.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Add Student Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        {/* <Input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            /> */}
                        {/* <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            /> */}
                        <Input
                            type="number"
                            name="user_id"
                            placeholder="User ID"
                            value={form.user_id}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="number"
                            name="institution_id"
                            placeholder="Institution ID"
                            value={form.institution_id}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="number"
                            name="phase_id"
                            placeholder="Phase ID"
                            value={form.phase_id}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="number"
                            name="subgroup_id"
                            placeholder="SubGroup ID"
                            value={form.subgroup_id}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="col-span-2">
                            Add Student
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Students List */}
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead>Name</TableHead> */}
                                {/* <TableHead>Email</TableHead> */}
                                <TableHead>User</TableHead>
                                <TableHead>Institution</TableHead>
                                <TableHead>Phase</TableHead>
                                <TableHead>SubGroup</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students?.data?.registrations.map((s) => (
                                <TableRow key={s.id}>
                                    <TableCell>
                                        <Input
                                            defaultValue={s.user?.name || ""}
                                            onBlur={(e) =>
                                                handleUpdate(s.id, "name", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                    <Input
                      defaultValue={s.user?.email || ""}
                      onBlur={(e) =>
                        handleUpdate(s.id, "email", e.target.value)
                      }
                    />
                  </TableCell> */}
                                    <TableCell>{s.institution?.name || "-"}</TableCell>
                                    <TableCell>{s.phase?.name || "-"}</TableCell>
                                    <TableCell>{s.subgroup?.name || "-"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
