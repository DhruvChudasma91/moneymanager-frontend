import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";


export const useUser = () => {
    const { user, setUser, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            return;
        }

        let isMounted = true;

        const fetchUser = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

                if(isMounted && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error fetching user info:", error);
                if(isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }

        }

        fetchUser();

        return () => {
            isMounted = false;
        }

    }, [setUser, clearUser, navigate]);

}