import {NavLink} from "react-router-dom"
import { useAuth } from "../context/authContext"

const SideBar = () => {
    const navigation = {
        admin : [
        {name:"home",path:"/admin"},
        {name: "Create Student",path: "/admin/students/create"},
        {name:"Create Teacher",path:"/admin/teachers/create"},
        {name:"Enroll student",path:"/admin/enrollments/create"},
        {name:"Create Courses",path:"/admin/courses/create"}]
        

    }
    
    const {user} = useAuth()
    const role = user.role
    const links = navigation[role]
    return(
      links.map((link) => (
    <NavLink key={link.path} to={link.path}>
        {link.name}
    </NavLink>
))
    )
}

export default SideBar