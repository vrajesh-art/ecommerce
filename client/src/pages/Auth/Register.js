import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()

  const handleClick = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", { name, email, password, phone, address, answer });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate('/login')
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong')
    }
  }
  return (

    <Layout>
      <div className='Register'>
        <h1 className='page-header'>Register Page</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">

            <input type="text" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />

          </div>
          <div className="mb-3">

            <input type="Email" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputPassword1" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">

            <input type="password" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">

            <input type="text" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputPassword1" placeholder='Enter Phone ' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-3">

            <input type="text" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputPassword1" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="mb-3">

            <input type="text" className="form-control" style={{ border: 'none', borderBottom: '5px solid purple', outline: 'none', boxShadow: 'none' }} id="exampleInputPassword1" placeholder='Enter Your favourite sports name' value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </div>

          <button type="submit" class="btn text-white" style={{ background: 'purple' }}>Submit</button>
        </form>
      </div>
    </Layout >
  )
}

export default Register
