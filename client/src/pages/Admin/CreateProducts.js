import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Select } from 'antd'
import axios from 'axios';
const { Option } = Select


const CreateProducts = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setquantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")

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
    const handlecreate = async (e) => {
        e.preventDefault();
        try {
            // hame yaaad hooga product create karte wakt postman mein hum create
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('photo', photo);
            productData.append('category', category);

            const { data } = await axios.post('/api/v1/product/create-product', productData)
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

    return (
        <Layout title={'Dashboard-Create category'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='page-header'>Create Products</h1>

                        <form onSubmit={handlecreate}>
                            <div className='m-1 w-75'>
                                <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
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
                                    {photo && (
                                        <div className='text-center'>
                                            {/* yaha pe hum browser property use car rhe hai image ko preview karne ke liye URL.createObjectURL(photo)  */}
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
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
                                    <Select bordered={false} size='large' showSearch rows={3} onChange={(value) => setShipping(value)} placeholder='write a shipping' className='form-control mb-3' >
                                        <Option value="0">No</Option>
                                        <Option value="1">yes</Option>
                                    </Select>
                                </div>

                                <div className='mb-3'>
                                    <button type='submit' className='btn text-white' style={{ backgroundColor: 'purple' }}>Create product</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default CreateProducts
