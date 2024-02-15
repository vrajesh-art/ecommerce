import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedname, setUpdatedName] = useState("")
    //function for handling the submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // yaha pe destructuring ke madat se apan joh hai saare data ko nikal denge
            const { data } = await axios.post('/api/v1/category/create-category', { name });
            if (data?.success) {
                toast.success(`${name} has been created`)
                // agar yeh success hoota hai tyoh usss case mein hume get all category ko bhi call karnahai
                getAllCategory();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Somnething went wrong in input form')
        }
    }
    // function for getting all the categories

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrrong in fetching all the categories')
        }
    };
    // lifecycle ke liye hume useeffect hook ka use karna padta hai
    useEffect(() => { getAllCategory() }, [])

    // this is the function for updating the category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // yahape hum destructutring ke madat se data ko nikalenege axios request se
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedname })
            if (data?.success) {
                toast.success(`${updatedname} has been updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                // iske saath hi mein getallcategory ko bhi call kardenge thaaki humein initial time pe value mil jaaye
                getAllCategory()

            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error('something went wrong in the update category')
        }
    }

    // here this is the function for deleting the category
    const handledelete = async (pid) => {
        try {

            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`);
            if (data?.success) {
                toast.success('category has been deleted');
                getAllCategory();
            }
            else {
                toast.error('error while deleting the category');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error while deleting the category')
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
                        <h1>manage Category </h1>
                        <div className='p-3'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">Operation</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>

                                                <td key={c._id}>{c.name}</td>

                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => { handledelete(c._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                    }

                                </tbody>
                            </table>
                            {/* ismein ek footer hoota hai usse hum null kardenge */}
                            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} >
                                <CategoryForm handleSubmit={handleUpdate} value={updatedname} setValue={setUpdatedName} />
                            </Modal >
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}


export default CreateCategory
