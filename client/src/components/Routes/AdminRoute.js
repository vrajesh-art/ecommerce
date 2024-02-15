import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth'
                // , {
                // agar hume aise header nhi add karna toh hum usse globally(default) context(auth) mein add kar sakte hai
                // headers: {
                //     // auth?.token ka matlabh hai ki agar auth hai toh uska token lo
                //     "Authorization": auth?.token
                // }
                // }
            )
            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        }

        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])
    // outlet ka use hume nesting route ke liye karn padta hai 
    return ok ? <Outlet /> : <Spinner path='' />
}