import Layout from '../components/layout/Layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const CategoryProduct = () => {
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (params?.slug) {
            getProductByCat()
        }
    }, [params?.slug])
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container mt-3">

                <h4 className="text-center">category-{category?.name}</h4>
                <h6 className='text-center'>{products?.length}-results founds</h6>
                <div className="row">

                    {/* {JSON.stringify(radio, null, 4)} */}
                    <h1 className="text-center">
                        <h1 className='text-center'>Products</h1>
                        <div className="d-flex flex-wrap justify-content-center">
                            {
                                products?.map((p) => (
                                    <div div className="card mb-3 m-2" style={{ width: '18rem' }} key={p._id}>
                                        {/* image yaha pe apan dynamicall fetch karenge by the route apan ne bnaya tah image ko fetch karne ke liye */}
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            {/* substring use kar sakte hai text limit decide karnekeliye */}
                                            <h6 className="card-text">{p.description.substring(0, 30)}...</h6>
                                            <h6 className="card-text">${p.price}</h6>
                                            {/* <a href="#" className="btn btn-primary">{p.quantity}</a> */}
                                            <button href="#" class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                            <button href="#" class="btn btn-primary ms-1">Add to cart</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                    </h1>
                    {/* <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1)
                            }}>
                                {loading ? "loading" : "load more.."}
                            </button>
                        )}
                    </div> */}
                </div>
            </div>



        </Layout>
    )
}

export default CategoryProduct


