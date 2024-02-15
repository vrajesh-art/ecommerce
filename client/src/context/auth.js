import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios';
// below we are reating the context named AuthContext
const AuthContext = createContext();

// const [auth, setAuth] = useState({
//     user: null,
//     token: ""
// })


//we can access the state from anywhere doing these
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // below method se by default axios mein joh bhi request jaayega usmein header present rahega
    axios.defaults.headers.common["Authorization"] = auth?.token
    useEffect(() => {
        const data = localStorage.getItem('auth');

        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsedData.user,
                token: parsedData.token
            })
        }
        //eslint-disable-next-line

    }, [auth])
    return (
        //yahape humne isse children ke saath wrap kiya hai hum isse kahi par bhi as a children use kar sakte hai
        <AuthContext.Provider value={[auth, setAuth]}>
            {/* aise value ke through auth and setauth dene se hum ise kahi par bhi use kar sakte hai */}
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }