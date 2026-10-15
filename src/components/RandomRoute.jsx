
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const RandomRoute = () => {
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
        return <Navigate to="/"/>
    }

    
}