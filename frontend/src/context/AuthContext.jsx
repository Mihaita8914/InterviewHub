import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            return JSON.parse(storedUser);
        }

        return null;
    });

    function loginUser(authResponse) {
        const userData = {
            username: authResponse.username,
            email: authResponse.email,
            role: authResponse.role
        };

        localStorage.setItem("token", authResponse.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
    }

    function logoutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    }

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}