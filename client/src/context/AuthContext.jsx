import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function safeJSONParse(str) {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}
const getInitialAuth = () => {
    const savedUser = safeJSONParse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");
    return savedUser && savedToken ? { token: savedToken, user: savedUser } : null;
};

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(getInitialAuth);


    // -------- LOGIN --------
    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setAuth({ token, user });
    };

    // -------- LOGOUT --------
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
