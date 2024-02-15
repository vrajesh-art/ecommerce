import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Select } from 'antd'
import axios from 'axios';
const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    const [name, setName] = useState("")
    const params = useParams()
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setquantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState("")

    // geting the single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product//get-singleproduct/${params.slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setquantity(data.product.quantity)
            setCategory(data.product.category._id)
            setPhoto(data.product.photo)
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }

    }
    // lifecycle ke liye hume useffect hook ka use karna padta hai
    useEffect(() => {
        getSingleProduct()
        // eslint-disable-next-line
    }, [])
    // for getting all the category

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }
    useEffect(() => { getAllCategory() }, []);
    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            // hame yaaad hooga product create karte wakt postman mein hum create
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo);
            productData.append('category', category);

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                toast.success('product has been created successfully');
                navigate('/dashboard/admin/products')
            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }

    const handleDelete = async () => {


        try {
            let answer = window.prompt('Are you sure you want to delete the product');
            if (!answer) {
                return;
            }
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('product has been deleted successfully')
            navigate('/dashboard/admin/products')

        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }
    return (
        <Layout title={'Dashboard-Create category'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Products</h1>

                        <form onSubmit={handleupdate}>
                            <div className='m-1 w-75'>
                                <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }} value={category}>
                                    {categories?.map((c) => (
                                        <>
                                            <Option key={c._id} value={c._id} > {c.name}</Option>
                                        </>
                                    ))

                                    }
                                </Select >

                                <div className='mb-3'>
                                    <label className='btn btn-outline-secondary col-md-12'>
                                        {/* agar photo hai toh photo ka name show karo else upload photo ka text show karo */}
                                        {photo ? photo.name : 'upload photo '}
                                        {/* image/* means it will accept all kind of images such as png,jpg etc */}
                                        <input type="file" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                        {/* setPhoto(e.target.files[0]) here the photo is coming from the files so we are targeting the files and files is the array so we are targeting the 0th index */}
                                    </label>
                                </div>
                                <div className='mb-3'>
                                    {photo ? (
                                        <div className='text-center'>
                                            {/* yaha pe hum browser property use car rhe hai image ko preview karne ke liye URL.createObjectURL(photo)  */}
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                                        </div>
                                    )
                                        :
                                        (
                                            <div className='text-center'>
                                                {/* yaha pe hum browser property use car rhe hai image ko preview karne ke liye URL.createObjectURL(photo)  */}
                                                <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className='img img-responsive' />
                                            </div>
                                        )

                                    }
                                </div>

                                <div className='mb-3'>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='enter the name' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <textarea type="text" size='large' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description of product here' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='product price' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <input type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} placeholder='write a quantity' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <Select bordered={false} size='large' showSearch rows={3} onChange={(value) => setShipping(value)} placeholder='write a quantity' className='form-control mb-3' value={shipping ? 'yes' : ' No'}>
                                        <Option value="0">No</Option>
                                        <Option value="1">yes</Option>
                                    </Select>
                                </div>

                                <div className='mb-3'>
                                    <button className='btn btn-primary' onClick={handleupdate}>Update Product</button>

                                </div>
                                <div className='mb-3'>
                                    <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default UpdateProduct
