import "@/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Boards from "./pages/Boards/Boards";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Layout from "./layout/Layout";
import BoardItem from "./pages/BoardItem/BoardItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/boards" element={<Boards></Boards>}></Route>
          <Route path="/boards/:id" element={<BoardItem></BoardItem>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
