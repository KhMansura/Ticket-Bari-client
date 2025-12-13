// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../providers/AuthProviders"; 
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//     const { user, loading } = useContext(AuthContext);
//     const [role, setRole] = useState(null);
//     const [isRoleLoading, setIsRoleLoading] = useState(true);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         if (user && !loading) {
//             // axiosSecure.get(`/users/role/${user.email}`)
//             axiosSecure.get(`/users/role/${user.email}?t=${new Date().getTime()}`)
//                 .then(res => {
//                     setRole(res.data.role);
//                     setIsRoleLoading(false);
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     setIsRoleLoading(false);
//                 });
//         } else if (!loading) {
//             setIsRoleLoading(false);
//         }
//     }, [user, loading, axiosSecure]);

//     return [role, isRoleLoading];
// };

// export default useRole;
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: role = '', isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        // CRITICAL: Only run this query if Firebase is done loading AND we have a user
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;