import React, { useState, useEffect } from 'react'
import Usermenu from '../../components/layout/Usermenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'


const Orders = () => {
    const [auth, setAuth] = useAuth()
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders")

            setOrders(data)
            console.log('orders')
        } catch (error) {
            console.log(error);
        }
    }

    // hume saare orders initial time pe chaiye isliye hum useeffect hook ka use karenge
    useEffect(() => {
        if (auth?.token) {
            getOrders()
        }
    }, [auth?.token])
    return (
        <Layout title={'Your Orders'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>status</th>
                                                    <th scope='col'>Buyer</th>

                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
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
                                                        <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} width="200px" height='200px' />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h4>{p.name}</h4>
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

export default Orders
