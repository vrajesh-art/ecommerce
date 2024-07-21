import Layout from '../components/layout/Layout'
import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import useCategory from '../hooks/useCategory'

const Categories = () => {
    const categories = useCategory();
    const navigate = useNavigate()
    return (
        <Layout title='all Categories'>
            {/* <div className="container">
                <div className="row">
                    {categories.map((c) => (
                        // gy and gx indicates the gap from x and y axis
                        <div className="col-md-6 mt-5 mb-3 gx-3 gy-3 " key={c._id}>
                            <Link rel="stylesheet" to={`/category/${c.slug}`} className='btn btn-primary w-100' style={{ height: '50px' }} >
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div> */}

            <div className='container'>
                <div className="row text-center">
                    <h1 className='page-header'>Categories</h1>
                </div>
                <div className="row">
                    <div className="d-flex flex-wrap text-center justify-content-center">
                        {categories.map((c) => (
                            // gy and gx indicates the gap from x and y axis
                            <div className="col-12 col-md-3 mt-5 ms-md-4 py-3" style={{ backgroundColor: 'rgb(211,211,211)', borderRadius: '20px' }} key={c._id} onClick={() => navigate(`/category/${c.slug}`)}>

                                <p className='fs-5 text-white fw-bold'>{c.name}</p>

                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, quam?</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Categories
