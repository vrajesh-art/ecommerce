import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
// destructure karenge options ko select mein se
const { Option } = Select

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);
    const [changeStatus, setChangeStatus] = useState("")

    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders')
            setOrders(data)
            console.log(orders)
        } catch (error) {
            console.log(error)
        }
    }

    // getorders ko hume initial time pe run karana hai isliye useeffect hook ka use karenge
    useEffect(() => {
        if (auth?.token) {
            getOrders()
        }
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value, })
            getOrders()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"All Orders Data"}>
            <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center page-header'>All Orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope='col' style={{ color: 'purple' }}>#</th>
                                                    <th scope='col' style={{ color: 'purple' }}>status</th>
                                                    <th scope='col' style={{ color: 'purple' }}>Buyer</th>

                                                    <th scope='col' style={{ color: 'purple' }}>Payment</th>
                                                    <th scope='col' style={{ color: 'purple' }}>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td><Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}
                                                    </Select></td>
                                                    <td>{o?.buyer?.name}</td>
                                                    {/* moment ek acha pachage hai date ko show karneka */}

                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="container">
                                            {o?.products?.map((p, i) => (
                                                <div className="row card flex-row mb-2 ">
                                                    <div className="col-md-4">
                                                        <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top rounded-5 shadow my-2' alt={p.name} width="200px" height='200px' />
                                                    </div>
                                                    <div className="col-md-8 mt-2">
                                                        <h4 className='category-header'>{p.name}</h4>
                                                        <p>{p.description.substring(0, 30)}..</p>
                                                        <p>Price: ${p.price}</p>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default AdminOrders
