import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

import { getClassroomById } from "@/store/slices/classRoomSlice";
import { getAssignmentsByClassroomId, createAssignment } from "@/store/slices/assignmentSlice";



const ManageClassrooms = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Redux state
    const { classrooms, loading: classroomLoading, error: classroomError } = useSelector(
        (state) => state.classroom
    );
    const { assignments, loading: assignmentLoading, error: assignmentError } = useSelector(
        (state) => state.assignment);
    console.log("Assignments:", assignments);

    // Local state for modal
    const [open, setOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
        classroomId: id,
        createdBy: "John Smith"
    });

    // Fetch classroom & assignments on mount or id change
    useEffect(() => {
        if (id) {
            dispatch(getClassroomById(id));
            dispatch(getAssignmentsByClassroomId(id));
        }
    }, [dispatch, id]);

    // Create Assignment
    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createAssignment(newAssignment)).unwrap();
            toast.success("Assignment created successfully!");
            setOpen(false);
            setNewAssignment({ title: "", description: "", dueDate: "", classroomId: id });
            dispatch(getAssignmentsByClassroomId(id)); // refresh assignments
        } catch (err) {
            toast.error("Failed to create assignment. Try again!");
        }
    };

    // Handle loading & error states
    if (classroomLoading || assignmentLoading) return <p>Loading...</p>;
    if (classroomError) return <p>Error: {classroomError}</p>;
    if (!classrooms) return <p>No classroom found</p>;

    return (
        <div className="container mx-auto p-4 space-y-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-bold">{classrooms.name}</h1>

            <Card className="shadow-xl rounded-2xl border border-gray-200">
                <Tabs defaultValue="stream" className="w-full">
                    <TabsList className="flex justify-start gap-4 border-b p-2">
                        <TabsTrigger value="stream">Stream</TabsTrigger>
                        <TabsTrigger value="classwork">Classwork</TabsTrigger>
                        <TabsTrigger value="people">People</TabsTrigger>
                        <TabsTrigger value="marks">Marks</TabsTrigger>
                    </TabsList>

                    {/* Stream Tab */}
                    <TabsContent value="stream" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Announcements & Updates</h2>
                        <p>This is the classroom stream where updates and announcements will appear.</p>

                        {/* Google Meet Section */}
                        <div className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                            <h3 className="text-md font-medium mb-2">Live Class Session</h3>
                            <p>Join the live class using Google Meet below:</p>
                            <a
                                href="https://meet.google.com/yxt-qepq-gbv"  // Replace with your Google Meet link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Join Google Meet
                            </a>
                        </div>
                    </TabsContent>

                    {/* Classwork Tab */}
                    <TabsContent value="classwork" className="p-4 space-y-4">
                        <h2 className="text-lg font-semibold mb-2">Assignments</h2>

                        {/* Create Assignment Modal */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="mb-4 flex items-center">
                                    <Plus className="w-4 h-4 mr-2" /> Create Assignment
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>New Assignment</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details for the new assignment.
                                    </DialogDescription>
                                </DialogHeader>

                                <form className="flex flex-col space-y-4 mt-4" onSubmit={handleCreateAssignment}>
                                    <Input
                                        placeholder="Title"
                                        value={newAssignment.title}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, title: e.target.value })
                                        }
                                        required
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        value={newAssignment.description}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, description: e.target.value })
                                        }
                                        required
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Due Date"
                                        value={newAssignment.dueDate}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                                        }
                                        required
                                    />
                                    <Button type="submit">Create</Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        {/* Existing Assignments */}
                        {assignments?.assignments && assignments?.assignments.length > 0 ? (
                            assignments?.assignments.map((a) => (
                                <Card key={a.id} className="mb-2 p-2">
                                    <CardTitle>{a.title}</CardTitle>
                                    <p>{a.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Due: {new Date(a.dueDate).toLocaleDateString()}
                                    </p>
                                </Card>
                            ))
                        ) : (
                            <p>No assignments yet.</p>
                        )}
                    </TabsContent>

                    {/* People Tab */}
                    <TabsContent value="people" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Teacher</h2>
                        <p>
                            {classrooms.teacher?.name} ({classrooms.teacher?.email})
                        </p>

                        <h2 className="text-lg font-semibold mt-4">Students</h2>
                        {classrooms.students?.length > 0 ? (
                            classrooms.students.map((s) => <p key={s.id}>{s.name}</p>)
                        ) : (
                            <p>No students enrolled.</p>
                        )}
                    </TabsContent>

                    {/* Marks Tab */}
                    <TabsContent value="marks" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Grades & Marks</h2>
                        <p>Marks and grade reports will be shown here.</p>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
};

export default ManageClassrooms;
