import axios from "axios"
import { useState } from "react"
import { useAuth } from "../context/authContext"

const CreateStudent = () => {
    const {token} = useAuth()
    const [student,setStudent] = useState({
        name:"",
        email:"",
        password:"",
        role:"student",
        rollNumber:"",
        department:"",
        semester:1,

    })
    const handleChange = (e) => {
    
        setStudent({
            ...student,
            [e.target.name] : e.target.name === "semester" ? Number(e.target.value):e.target.value,
        })
        console.log(student)
    }
    const handleSubmit = async(e) => {
        
        e.preventDefault()
        console.log(student)
        try{
            const response = await axios.post(
                "http://localhost:5001/api/auth/register",
                student,
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            )
            console.log(response.data)

        }catch(err){
            console.log(err)

        }


    }
    return(
        <div>
            <h1>create student page</h1>
            <form onSubmit={handleSubmit}>
            <input name="name" value={student.name} onChange={handleChange} placeholder="student name"/>
            <input name="email" value={student.email} onChange={handleChange} placeholder="student email"/>
            <input name="password" value={student.password} onChange={handleChange} placeholder="student password"/>
             <input name="rollNumber" value={student.rollNumber} onChange={handleChange} placeholder="student rollnumber"/>
              <input name="department" value={student.department} onChange={handleChange} placeholder="student department"/>
              <input name="semester" value={student.semester} onChange={handleChange} placeholder="student semester"/>
            <button type="submit">create</button>
            </form>
            
            
        </div>
    )
}

export default CreateStudent