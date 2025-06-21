import "@/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board/Board";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/borad" element={<Board></Board>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
