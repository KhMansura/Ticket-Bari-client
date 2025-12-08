import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProviders"; 
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user && !loading) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setIsRoleLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsRoleLoading(false);
                });
        } else if (!loading) {
            setIsRoleLoading(false);
        }
    }, [user, loading, axiosSecure]);

    return [role, isRoleLoading];
};

export default useRole;