// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: role, isLoading: isRoleLoading } = useQuery({
//         queryKey: [user?.email, 'role'],
//         enabled: !loading && !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/role/${user.email}`);
//             return res.data?.role;
//         }
//     })
//     return [role, isRoleLoading]
// };
// export default useRole;
import { useContext, useEffect, useState } from "react";
// Ensure this path is correct based on your folder structure
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