import "@/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardsPage from "./pages/Boards/Boards";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/Main/MainPage";
import Layout from "./layout/Layout";
import SignupPage from "./pages/Signup/SignupPage";
import BoardFormPage from "./pages/BoardForm/BoardFormPage";
import BoardDetailPage from "./pages/BoardItem/BoardDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route path="/boards" element={<BoardsPage></BoardsPage>} />
          <Route path="/boards/new" element={<BoardFormPage></BoardFormPage>} />
          <Route
            path="/boards/edit/:id"
            element={<BoardFormPage></BoardFormPage>}
          />
          <Route
            path="/boards/:id"
            element={<BoardDetailPage></BoardDetailPage>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
