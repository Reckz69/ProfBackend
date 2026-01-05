import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from  "./layouts/mainLayout";
import Setup from "./pages/Setup";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Setup" element={<Setup />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
