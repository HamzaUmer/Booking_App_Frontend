import './register.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
      });
    
      const {loading, error, dispatch} = useContext(AuthContext);
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
      };
    
      const handleRegister = async(e) => {
          e.preventDefault();
          dispatch({type: "LOGIN_START"});
          try {
            const res = await axios.post("/api/auth/register", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            navigate("/login");
          } catch (error) {
            dispatch({ type: "LOGIN_FAILED", payload: error.response.data})
          }
      }
  return (
    <div className="register">
    <div className="registerContainer">
      <input type="text" placeholder= "username" id="username" onChange={handleChange} className="regInput" />
      <input type="email" placeholder= "email" id="email" onChange={handleChange} className="regInput" />
      <input type="password" placeholder= "password" id="password" onChange={handleChange} className="regInput" />
      <button  className="registerButton" onClick={handleRegister}>Register</button>
      <button onClick={() => navigate('/')} className="gotoButton">Go to HomePage</button>
      {error && <span>{error.message}</span>}
    </div>
   </div>
  )
}

export default Register