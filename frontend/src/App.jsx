import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import QuestionDetails from "./pages/QuestionDetails/QuestionDetails";
import QuestionForm from "./pages/Admin/QuestionForm";
import Pricing from "./pages/Pricing/Pricing";
import Register from "./pages/Register/Register";
import Favorites from "./pages/Favorites/Favorites";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/questions" element={<Questions />} />

                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

                <Route path="/pricing" element={<Pricing />} />

                <Route path="/questions/:id" element={<QuestionDetails />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/questions/new"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <QuestionForm />
                        </ProtectedRoute>
                    }
                />

		<Route
    		    path="/admin/questions/:id/edit"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <QuestionForm />
                        </ProtectedRoute>
                   }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;