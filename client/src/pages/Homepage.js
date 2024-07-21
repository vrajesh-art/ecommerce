import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
// import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import '../index.css'
const Homepage = () => {
    // const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart()
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Function to get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    // Function to get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setProducts(data?.products)
        } catch (error) {
            toast.error('something has went wrong');
            console.log(error)
        }
    }

    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    // Filtered products based on category and price
    const filteredProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, [])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProducts()
        }
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) {
            filteredProduct();
        }
    }, [checked, radio])

    // Function to get total count of products
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count');
            setTotal(data?.count)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) {
            return;
        }
        loadMore()
    }, [page])

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <Layout title={'ALL products -Best offers are here'}>
            <h1 className='text-center mt-2 page-header'>Products</h1>
            <div className="container-fluid">
                <div className="row mt-2 flex-md-row-reverse">
                    <div className="col-md-9">
                        <h1 className="text-center">
                            <div className="d-flex flex-wrap gap-2">
                                {products?.map((p) => (
                                    <div className="card mb-3 m-2 mt-1 shadow-lg rounded-5" style={{ width: '16rem', border: 'none' }} key={p._id}>
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid rounded-circle" style={{ border: 'none' }} alt={p.name} />
                                        <div className="card-body text-start">
                                            <h5 className="card-title">{p.name}</h5>
                                            <h6 className="card-text">${p.price}</h6>
                                            <div className='d-flex justify-content-between ' >
                                                <button className="btn py-2 px-3 text-white" style={{ backgroundColor: 'purple' }} onClick={() => navigate(`/product/${p.slug}`)}>details</button>
                                                <button className="btn py-2 px-3 text-white" style={{ backgroundColor: 'purple' }} onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                    toast.success('successfully added to the cart');
                                                }}> cart</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </h1>
                        <div className='m-2 p-3'>
                            {products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? "loading" : "load more.."}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-sm-center">
                        <h4 className="text-start">
                            <span className='category-header'> Filter category</span>
                            <div className='d-flex flex-column ms-1'>
                                {categories?.map((c) => (
                                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                                ))}
                            </div>
                        </h4>
                        <h4 className="text-start mt-4">
                            <span className='category-header'>  Filter by price</span>
                            <div className='d-flex flex-column ms-1'>
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map(p => (
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                            <div className="flex flex-column">
                                <button className="btn btn-danger mt-4" onClick={() => window.location.reload()}>Refresh Filters</button>
                            </div>
                        </h4>
                    </div>
                </div>
            </div >
        </Layout >

    )
}

export default Homepage
