import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Home,HotelList, Login, Hotel} from './pages';
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/hotels" element={<HotelList/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
