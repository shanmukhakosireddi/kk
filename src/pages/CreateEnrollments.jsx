import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const CreateEnrollment = () => {
    const { token } = useAuth();

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [enrollment, setEnrollment] = useState({
        studentId: "",
        courseId: "",
    });

    const [message, setMessage] = useState("");

    // Get students and courses
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsResponse, coursesResponse] =
                    await Promise.all([
                        axios.get(
                            "http://localhost:5001/api/users",
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ),

                        axios.get(
                            "http://localhost:5001/api/courses",
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ),
                    ]);

                // Only keep students
                const studentUsers = studentsResponse.data.filter(
                    (user) => user.role === "student"
                );

                setStudents(studentUsers);
                setCourses(coursesResponse.data);

            } catch (error) {
                console.log(
                    error.response?.data || error.message
                );
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleChange = (e) => {
        setEnrollment({
            ...enrollment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedCourse = courses.find(
            (course) => course._id === enrollment.courseId
        );

        if (!selectedCourse) {
            setMessage("Please select a course");
            return;
        }

        const enrollmentData = {
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
            semester: selectedCourse.semester,
            academicYear: selectedCourse.academicYear,
        };

        try {
            const response = await axios.post(
                "http://localhost:5001/api/enrollments",
                enrollmentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);

            setEnrollment({
                studentId: "",
                courseId: "",
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Error enrolling student"
            );
        }
    };

    return (
        <div>
            <h1>Enroll Student</h1>

            <form onSubmit={handleSubmit}>

                {/* Student */}
                <label>Student</label>

                <select
                    name="studentId"
                    value={enrollment.studentId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Student
                    </option>

                    {students.map((student) => (
                        <option
                            key={student._id}
                            value={student._id}
                        >
                            {student.name} - {student.rollNumber}
                        </option>
                    ))}
                </select>

                <br />

                {/* Course */}
                <label>Course</label>

                <select
                    name="courseId"
                    value={enrollment.courseId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Course
                    </option>

                    {courses.map((course) => (
                        <option
                            key={course._id}
                            value={course._id}
                        >
                            {course.courseName} - {course.courseCode}
                        </option>
                    ))}
                </select>

                <br />

                <button type="submit">
                    Enroll Student
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
};

export default CreateEnrollment;