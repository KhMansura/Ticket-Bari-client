// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: 'import.meta.env.VITE_SERVER_URL', 
// });

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
    
//     // If you haven't created useAuth yet, you can use useContext(AuthContext) directly here
//     // But for now, let's keep it simple and assume we just need the interceptor.

//     useEffect(() => {
//         axiosSecure.interceptors.request.use((config) => {
//             const token = localStorage.getItem('access-token');
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         });

//         axiosSecure.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                     // Optional: Log out user if token is invalid
//                     // await logOut();
//                     // navigate('/login');
//                 }
//                 return Promise.reject(error);
//             }
//         );
//     }, [navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; 

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, 
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth(); // Get logout function

    useEffect(() => {
        // 1. REQUEST INTERCEPTOR (Attaches Token)
        const requestInterceptor = axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // 2. RESPONSE INTERCEPTOR (Handles 401/403 Errors)
        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response ? error.response.status : null;
            
            // If token is invalid (401) or forbidden (403), log out the user
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });

        // 3. CLEANUP 
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }

    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;