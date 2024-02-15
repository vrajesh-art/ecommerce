import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast'
const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    // state bnayenge token ko get and set karne ke liye
    const [clientToken, setClientToken] = useState('')
    // instance and loading spinner ke liye bhi hum state bna lenge
    // instance joh hai woh api ke saath aata hai
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // below is the function for the total price

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;

            })
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
        } catch (error) {
            console.log(error)
        }
    }
    // below is the function for deleting the item from the cart

    const removeCartItem = (pid) => {
        try {
            // yaha hume pehle cart ke item ko get karna hoga
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid)
            // slice ke madat se apan item ko remove karenge
            myCart.splice(index, 1);
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    // this is the function for getting and then setting the clienttoken using usestate
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)
        }
    }

    // below is the function for handling the handle payments
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', { nonce, cart })
            setLoading(false);
            // ek baar payment hoogaya toh hume sab ko cart mein se nikal dena hai and fir later use orders ke page pe joh hai redirect kardenge
            localStorage.removeItem('cart');
            setCart([])
            navigate('/dashboard/user/orders');
            toast.success('payment has been made successfully')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    // useeffect hook ke madat se isko hum initial time mein joh hai get kardenge
    useEffect(() => {
        getToken()
    }, [auth?.token])

    // below is the function for calculating the total bill
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1 mt-2">
                            {/* below line kehta hai agar ayth.token hai toh uss case mein auth?.user?.name display kardena */}
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart.length > 1 ? `you have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {cart?.map((p) => (
                            <div className="row card flex-row mb-2 ">
                                <div className="col-md-4">
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} width="200px" height='200px' />
                                </div>
                                <div className="col-md-8">
                                    <h4>{p.name}</h4>
                                    <p>{p.description.substring(0, 30)}..</p>
                                    <p>Price: ${p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>cart Summary</h2>
                        <p>Total|CheckOut|Payment</p>
                        {/* below is the horizontal line for giving the line for seperation */}
                        <hr />
                        <h4>Total={totalPrice()}</h4>

                        {auth?.user?.address ? (<>
                            <div className="mb-3">
                                <h4>Current address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning' onClick={() =>
                                    navigate('/dashboard/user/profile')}>Update Address</button>
                            </div>
                        </>) : (<div className='mb-3'>{
                            auth?.token ? (<button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}></button>) : (<button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                state: '/cart'
                                // yeh state se hum jab wapas login karenge toh direct cart ke page pe aayenge
                            })}>Please login to checkout</button>)
                        }</div>)}

                        <div className="mt-4">
                            {!clientToken || !cart?.length ? "" : <>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault',

                                        },
                                    }}
                                    // oninstance mein hume instance milta hai usse hum setinstance ke madat se instance ko set karlenge
                                    onInstance={(instance) => setInstance(instance)}
                                />
                                <button className='btn btn-primary' onClick={handlePayment}
                                    disabled={loading || !instance || !auth?.user?.address}>{loading ? "processing" : "make payment"}</button>
                            </>}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
