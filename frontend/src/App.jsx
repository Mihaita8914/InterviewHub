import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/questions"
                    element={<Questions />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;