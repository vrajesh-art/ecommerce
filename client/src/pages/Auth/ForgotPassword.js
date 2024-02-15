import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()
    const handlelogin = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("/api/v1/auth/forgot-password", { email, newPassword, answer })


            if (res && res.data.success) {
                toast.success(res.data && res.data.message)




                navigate('/login');
                // json data localstorage mein support nhi karta isliye use stringify katna padta hai


            }
            else {
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    return (
        <Layout title={'Forgot password- Ecommerce App'}>

            <div className='login'>
                <h1>Reset Password</h1>
                <form onSubmit={handlelogin}>
                    <div class="form-group mb-3">

                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div class="form-group mb-3">

                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div class="form-group mb-3">

                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="what is your favourite sportz name" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </div>

                    <button type="submit" class="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword
