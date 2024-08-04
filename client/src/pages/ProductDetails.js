import Layout from '../components/layout/Layout'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProduct();

    }, [])


    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-singleproduct/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    // get the simple product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='row container mt-4 page-header'>
                <h1 className='text-center page-header'>Product Details</h1>
            </div>
            <div className="row container mt-4 px-4">
                <div className="col-md-6 shadow-lg" style={{ borderRadius: '50px' }}>
                    <img src={`/api/v1/product/product-photo/${product._id}`} className='card-img-top img-fluid rounded-circle ' style={{ border: 'none', height: '350px' }} alt={product.name} />
                </div>
                <div className="col-md-6 d-flex justify-content-end ">

                    <div className='text-start '>
                        <p className='fs-5'><span className='fw-normal' style={{ color: 'purple' }}>Name</span> : {product.name}</p>
                        <p className='fs-5'><span className='fw-normal' style={{ color: 'purple' }}>Description</span> : {product.description}</p>
                        <p className='fs-5'><span className='fw-normal' style={{ color: 'purple' }}>Price</span> : {product.price}</p>
                        <p className='fs-5'><span className='fw-normal ' style={{ color: 'purple' }}>Category</span> : {product?.category?.name}</p>
                        {/* <h6>Category : {product.category.name}</h6> */}
                        <button className="btn py-2 px-3 text-white" style={{ backgroundColor: 'purple' }}>Add To Cart</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <h1 className='text-center page-header'>Here are some similar products</h1>
                {/* below karne se hume json ke form mein pura data milega */}
                {/* {JSON.stringify(relatedProducts, null, 4)} */}
                {relatedProducts.length < 1 && (<p className='text-center'>No similar products found</p>)}
                <div className="display-flex flex-wrap p-4">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2 shadow-lg rounded-5" style={{ width: "16rem", border: 'none' }}>
                            <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top img-fluid rounded-circle' alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>

                                <p className="card-text">$ {p.price}</p>
                                <div className='d-flex justify-content-between'>

                                    <button className="btn py-2 px-3 text-white" style={{ backgroundColor: 'purple' }} onClick={() => navigate(`/product/${p.slug}`)}> Details</button>
                                    <button className='btn py-2 px-3 text-white' style={{ backgroundColor: 'purple' }}>cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
