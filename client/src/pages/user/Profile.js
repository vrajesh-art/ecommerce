import React, { useState, useEffect } from 'react'
import Usermenu from '../../components/layout/Usermenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    // context
    const [auth, setAuth] = useAuth()
    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")

    // get the user data useffect will help us to get the initial time
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])


    const handleClick = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                // here below we are basically updating the localStorage
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("profile has been updated successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }
    return (
        <Layout title={'Your Profile'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <div className='Register'>
                            <h1>Register Page</h1>
                            <form onSubmit={handleClick}>
                                <div className="mb-3">

                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />

                                </div>
                                <div className="mb-3">

                                    <input type="Email" className="form-control" id="exampleInputPassword1" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required disabled />
                                </div>
                                <div className="mb-3">

                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">

                                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder='Enter Phone ' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">

                                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>


                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
