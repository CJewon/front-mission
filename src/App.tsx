import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Borad from "./pages/Borad";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/borad" element={<Borad></Borad>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
