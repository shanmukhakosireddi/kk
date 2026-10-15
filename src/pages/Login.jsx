import { useState } from "react";
import axios from "axios"
import { useAuth } from "../context/authContext";

const Login = () => {
  const[error,setError] = useState("")
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value,
            
        })
        setError("")

    }
    const {login} = useAuth()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(user)
        try{
            const response = await axios.post(
                "http://localhost:5001/api/auth/login",
                user
            )
            console.log(response.data)
            login(response.data)
            setError("")

        }catch(error){
            console.log(error)
            setError("invalid password or email")
        }

    }
    
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-6">
          Student Result Management
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email:
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password:
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <p>{error}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          
          
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;