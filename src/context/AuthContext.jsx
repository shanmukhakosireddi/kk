import { createContext,useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [token,setToken] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))
        const userToken = (localStorage.getItem("token"))
         
        if(userData != null && userToken != null){
            setUser(userData)
            setToken(userToken)
            
           

        }
        setLoading(false)

    },[])
    
    const login = (loginData) => {
    localStorage.setItem("token",loginData.token)
    localStorage.setItem("user",
        JSON.stringify(loginData.user)
    )
    setUser(loginData.user)
            setToken(loginData.token)
    
    const role = loginData.user.role
    if(role === "admin"){
        navigate("/admin")
    }
    else if(role === "teacher"){
        navigate("/teacher")
    }
    else if(role === "student"){
        navigate("/student")
    }


}

    return(
        <AuthContext.Provider  value={{
                user,
                token,
                loading,
                login,
            }}>
           {children}


        </AuthContext.Provider>
    )
}



export const useAuth = ()=> {
    return useContext(AuthContext)
}
