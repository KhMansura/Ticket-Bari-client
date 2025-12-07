import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; // We will create this small hook next

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    // If you haven't created useAuth yet, you can use useContext(AuthContext) directly here
    // But for now, let's keep it simple and assume we just need the interceptor.

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Optional: Log out user if token is invalid
                    // await logOut();
                    // navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);

    return axiosSecure;
};

export default useAxiosSecure;