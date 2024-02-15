import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const handlelogin = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("/api/v1/auth/login", { email, password })


            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    //baaki information ko as it is rakhenbe jaisi ki auth
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                const dataToStore = res.data;

                // Convert the data to a JSON string
                const jsonString = JSON.stringify(dataToStore);

                // Store the JSON string in localStorage under a specific key, for example 'myData'
                localStorage.setItem('auth', jsonString);

                navigate(location.state || '/');
                // json data localstorage mein support nhi karta isliye use stringify katna padta hai


            }
            else {
                toast.error(res.data.message);
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    return (
        <Layout>

            <div className='login'>
                <h1>Login Page</h1>
                <form onSubmit={handlelogin}>
                    <div class="form-group mb-3">

                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div class="form-group mb-3">

                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="form-group mb-3">
                        <button type="button" class="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forgot password</button>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login
