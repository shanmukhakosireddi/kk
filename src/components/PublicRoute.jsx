import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { children } from "react";

export const PublicRoute = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return(
            <div>
                <h1>loading</h1>
            </div>
        )
    }else if(user){
        return <Navigate to={`/${user.role}`}/>
    }else{
        return  children
    }

}