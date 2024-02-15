import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
    return (
        <Layout title={'Our Policy'}>
            <div className='text-center text-lg-start bg-light'>
                <div className='d-flex p-4 justify-content-center  justify-content-xl-between align-items-center flex-wrap'>
                    <div className='d-flex justify-content-center align-items-center '>
                        <img src="" alt="" />
                    </div>
                    <div className=' Contact-info d-flex flex-column  justify-content-md-center align-items-center'>

                        <h1 className='p-2 text-center' style={{ color: "purple" }}>Contact Us</h1>
                        <p className='text-secondary fs-4'>Please contact us if any query or information required</p>
                        <div className='text-start Contact-contact-details'>
                            <p className="mt-3 text-dark">
                                : www.help@ecommerceapp.com
                            </p>
                            <p className="mt-3">
                                : 012-3456789
                            </p>
                            <p className="mt-3">
                                : 1800-0000-0000 (toll free)
                            </p>
                        </div>


                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Policy
