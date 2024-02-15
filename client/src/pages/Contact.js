import React from 'react'
import Layout from '../components/layout/Layout'
import Contact1 from '../images/Contact-1.gif'
import { BiSupport, BiPhoneCall } from 'react-icons/bi'
import { BsFillEnvelopeCheckFill } from 'react-icons/bs'

const Contact = () => {
    return (
        <Layout title={'Contact US'}>

            <div className='text-center text-lg-start bg-light'>
                <div className='d-flex p-4 justify-content-center  justify-content-xl-between align-items-center flex-wrap'>
                    <div className='d-flex justify-content-center align-items-center '>
                        <img src={Contact1} alt="" />
                    </div>
                    <div className=' Contact-info d-flex flex-column  justify-content-md-center align-items-center'>

                        <h1 className='p-2 text-center' style={{ color: "purple" }}>Contact Us</h1>
                        <p className='text-secondary fs-4'>Please contact us if any query or information required</p>
                        <div className='text-start Contact-contact-details'>
                            <p className="mt-3 text-dark">
                                <BsFillEnvelopeCheckFill className='ContactIcons' /> : www.help@ecommerceapp.com
                            </p>
                            <p className="mt-3">
                                <BiPhoneCall className='ContactIcons' /> : 012-3456789
                            </p>
                            <p className="mt-3">
                                <BiSupport className='ContactIcons' /> : 1800-0000-0000 (toll free)
                            </p>
                        </div>


                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Contact
