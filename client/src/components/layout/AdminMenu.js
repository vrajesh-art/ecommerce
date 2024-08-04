import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>

                <div className="list-group">
                    <h4 className='category-header'>Admin Panel</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">create category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>

                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">products</NavLink>
                    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">orders</NavLink>

                </div>
            </div>

        </>
    )
}

export default AdminMenu
