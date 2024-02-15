import Layout from '../components/layout/Layout'
import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import useCategory from '../hooks/useCategory'

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title='all Categories'>
            <div className="container">
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
            </div>
        </Layout>
    )
}

export default Categories
