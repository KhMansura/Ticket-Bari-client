// import { createContext, useEffect, useState } from "react";
// import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
// import axios from "axios";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const googleProvider = new GoogleAuthProvider();

//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     const googleSignIn = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider);
//     }

//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }

//     const updateUserProfile = (name, photo) => {
//         return updateProfile(auth.currentUser, {
//             displayName: name, photoURL: photo
//         });
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, currentUser => {
//             setUser(currentUser);
//             if (currentUser) {
//                 // get token and store client
//                 // const userInfo = { email: currentUser.email };
//                 // axios.post('import.meta.env.VITE_SERVER_URL/jwt', userInfo)
//                 currentUser.getIdToken(true)
//                     .then(res => {
//                         if (res.data.token) {
//                             localStorage.setItem('access-token', res.data.token);
//                             setLoading(false);
//                         }
//                     })
//             } else {
//                 localStorage.removeItem('access-token');
//                 setLoading(false);
//             }
//         });
//         return () => {
//             return unsubscribe();
//         }
//     }, [])

//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signIn,
//         googleSignIn,
//         logOut,
//         updateUserProfile
//     }

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
// Note: We don't need axios here anymore for tokens!

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        localStorage.clear();
    sessionStorage.clear();
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // ---------------------------------------------------------
    // ✅ THIS IS THE FIX: GET TOKEN FROM FIREBASE DIRECTLY
    // ---------------------------------------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                // Ask Firebase for the token
                currentUser.getIdToken(true)
                    .then(token => {
                        // Save it to Local Storage
                        localStorage.setItem('access-token', token);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("Token Error:", error);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;