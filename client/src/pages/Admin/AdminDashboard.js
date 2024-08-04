import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    //kuch hume set nhi karna isliye hum sirf auth use kar rhe hai
    const [auth] = useAuth()
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12" style={{ maxWidth: '500px' }}>
                        <AdminMenu />
                    </div>
                    {/* <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>Admin Name:{auth?.user?.name}</h3>
                            <h3>Admin Name:{auth?.user?.email}</h3>
                            <h3>Admin Name:{auth?.user?.phone}</h3>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
