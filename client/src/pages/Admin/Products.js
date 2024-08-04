import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Products = () => {
    const [product, setProduct] = useState([]);

    // getall products

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProduct(data.products)
        } catch (error) {
            console.log('error');
            toast.error('Something went wrong');
        }
    }

    // lifecycle model yahape create karna padega
    useEffect(() => { getAllProducts() }, [])
    return (

        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row ">
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='text-center page-header'><h1>All products</h1></div>
                        <div className='d-flex flex-wrap align-items-center justify-content-center'>

                            {product?.map((p) => (
                                <Link key={p._id} className='Product-link' to={`/dashboard/admin/product/${p.slug}`}>
                                    <div div className="card mb-3 m-2 shadow-lg rounded-5" style={{ maxWidth: '16rem', border: 'none' }} key={p._id}>
                                        {/* image yaha pe apan dynamicall fetch karenge by the route apan ne bnaya tah image ko fetch karne ke liye */}
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid rounded-circle" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            {/* <p className="card-text">{p.description.substring(0, 30)}</p> */}
                                            <div className='d-flex '>
                                                <button href="#" className="btn ms-1 text-white" style={{ backgroundColor: 'purple' }}>${p.price}</button>
                                                <button href="#" className="btn ms-1 text-white " style={{ backgroundColor: 'purple' }}>{p.quantity}</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>



                            ))}
                        </div>

                    </div>
                </div>
            </div>



        </Layout >
    )
}

export default Products
