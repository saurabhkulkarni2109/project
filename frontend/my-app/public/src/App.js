import{BrowserRouter,Routes,Route}from "react-router-dom"
import Home from "./Pages/home/Home";
import List from "./Pages/list/List";
import Hotel from "./Pages/hotels/Hotel";
import Register from "./Pages/register/Register";
import Login from "./Pages/login/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
