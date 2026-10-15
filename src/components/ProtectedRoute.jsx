import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const ProtectedRoute = ({children,requiredRole}) => {
    const {user,loading} = useAuth()
    

    if(loading){
        return(
            <div>
                <h1>loading</h1>
            </div>
        )
    }else if(!user){
        return <Navigate to={"/"}/>

    }else if(user.role !== requiredRole){
        return <Navigate to={`/${user.role}`}/>
    }else{
        return children
    }


}