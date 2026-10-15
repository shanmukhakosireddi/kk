import axios from "axios"
import {useState} from "react"
import { useAuth } from "../context/authContext"

const CreateTeacher = () => {
    const {token} = useAuth()
    const [teacher,setTeacher] = useState({
        name:"",
        email:"",
        password:"",
        role:"teacher",

    })
    const handleChange = (e) => {
        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value
        })
        console.log(teacher)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(teacher)
        try {
            const response = await axios.post("http://localhost:5001/api/auth/register", teacher, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
        } catch (error) {
            console.error("Error creating teacher:", error)
        }
    }
    return (
        <div>
            <h1>create teacher page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={teacher.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={teacher.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={teacher.password}
                    onChange={handleChange}
                />
                <button type="submit">Create Teacher</button>
            </form>
        </div>
    )
}

export default CreateTeacher