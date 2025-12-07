import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders"; // Adjust path if needed

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;