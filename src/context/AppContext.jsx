import { createContext, useState, useEffect } from "react";
import axios from "../util/axiosConfig";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            setLoading(false);
            return;
        }

        axios.get("/me")
            .then((res) => setUser(res.data))
            .finally(() => setLoading(false));


    }, []);

    const clearUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const contextValue = {
        user,
        setUser,
        clearUser,
        loading
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}