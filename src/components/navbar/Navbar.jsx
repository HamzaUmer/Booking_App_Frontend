import "./navbar.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const {user,error,dispatch,loading} = useContext(AuthContext);
    const navigator = useNavigate()
    const handleLogout =(e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_FAILED"});
        navigator("/login")
    }
    return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo" onClick={() => navigator('/')}>MHU Booking App</span>
            {user ? 
            <>
            <div className="navItemss">
            <h3 className="username">Welcome {user.username} 🙌 </h3>
            <button className="navButton" onClick={handleLogout}>Logout</button>
            </div>
            </>  
            : (<div className="navItems">
                <button onClick={() => navigator('/register')} className="navButton">Register</button>
                <button onClick={() => navigator('/login')} className="navButton">Login</button>
            </div>)}
        </div>
    </div>
    )
}

export default Navbar