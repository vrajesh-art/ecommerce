import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
// import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/prices'
import e from 'cors'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'

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
    // below is the function for getting all the categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }


    // below is the function for getting all the products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setProducts(data?.products)
        } catch (error) {
            toast.error('something has went wrong');
            console.log(error)
        }
    }

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    const filteredProduct = async (req, res) => {
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
        // getAllProducts();

        if (!checked.length || !radio.length) {
            getAllProducts()
        }


        //eslint-disable-next-line
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) {
            filteredProduct();
        }
    }, [checked, radio])

    // below is the function for getting the total count
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

    // iske baadh hume search based product pe kaam karenge ismein problem yeh hai hamare pass unlimited product hoo sakta hai agar hum isse yehi pe add karenge toh filter sahi se kaam nhi karega
    // iske liye hum contextr api ke madat se isse hum yaha per get karenge


    //checked and radio jaise change hoonge useeffect hook chalega
    return (
        <Layout title={'ALL products -Best offers are here'}>
            <div className="row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">
                        Filter here by category
                        <div className='d-flex flex-column ms-1'>
                            {
                                categories?.map((c) => (
                                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                                ))
                            }
                        </div>
                    </h4>
                    <h4 className="text-center mt-4">
                        Filter  by price
                        <div className='d-flex flex-column ms-1'>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    Prices?.map(p => (
                                        <div >
                                            <Radio value={p.array} key={p._id}>{p.name}</Radio>
                                        </div>

                                    ))
                                }
                            </Radio.Group>
                        </div>

                        <div className="flex flex-column">
                            {/* window.location.reload will refresh the page */}
                            <button className="btn btn-danger" onClick={() => window.location.reload()}>Refresh Filters</button>
                        </div>
                    </h4>
                </div>
                <div className="col-md-9">
                    {JSON.stringify(radio, null, 4)}
                    <h1 className="text-center">
                        <h1 className='text-center'>Products</h1>
                        <div className="d-flex flex-wrap">
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
                                            <button href="#" class="btn btn-primary ms-1" onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                                toast.success('successfully added to the cart')
                                            }}>Add to cart</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                    </h1>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1)
                            }}>
                                {loading ? "loading" : "load more.."}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Homepage
