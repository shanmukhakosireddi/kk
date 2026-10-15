import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const CreateCourse = () => {
    const { token } = useAuth();

    const [course, setCourse] = useState({
        courseName: "",
        courseCode: "",
        credits: 0,
        semester: 1,
        department: "",
        academicYear: "",
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]:
                e.target.name === "credits" ||
                e.target.name === "semester"
                    ? Number(e.target.value)
                    : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(course);

        try {
            const response = await axios.post(
                "http://localhost:5001/api/courses",
                course,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Create Course Page</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={course.courseName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="courseCode"
                    placeholder="Course Code"
                    value={course.courseCode}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="credits"
                    placeholder="Credits"
                    value={course.credits}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={course.semester}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={course.department}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="academicYear"
                    placeholder="Academic Year"
                    value={course.academicYear}
                    onChange={handleChange}
                />

                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;