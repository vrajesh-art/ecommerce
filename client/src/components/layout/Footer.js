import React from 'react'
import "../../index.css"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className='text-center text-lg-start bg-light '>
                <section className='d-flex justify-content-center justify-content-lg-between p-4'>
                    <div className='me-5 d-none d-lg-block'>
                        <h6 className='text-secondary' >Get connected with us on <span style={{ color: "purple", fontSize: "18px" }}>social network</span></h6>
                    </div>
                    <div className='footer-Social-Links ms-lg-auto d-sm-flex flex-wrap'>
                        <a href="" className='me-4 bg-white rounded-2 p-2'>
                            <i className='fab fa-facebook-f  '></i>
                        </a>
                        <a href="" className='me-4 p-2 bg-white  rounded-2'>
                            <i className='fab fa-twitter '></i>
                        </a>
                        <a href="" className='me-4 p-2 bg-white rounded-2'>
                            <i className='fab fa-google '></i>
                        </a>
                        <a href="" className='me-4 p-2 bg-white  rounded-2'>
                            <i className='fab fa-instagram '></i>
                        </a>
                        <a href="" className='me-4 p-2 bg-white  rounded-2'>
                            <i className='fab fa-linkedin'></i>
                        </a>
                    </div>
                    <hr style={{ color: "black" }} />
                </section>


                <section className=''>
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <i className='fas fa-gem me-3 '></i><span style={{ color: "purple" }}> Company Name</span>
                                </h6>
                                <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dicta, porro expedita sit quos facilis libero suscipit repellendus ipsam accusamus.</p>

                            </div>
                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color: "purple" }}>
                                    Useful Links
                                </h6>
                                <p>
                                    <Link to={'/'} className='text-reset'>Home</Link>
                                </p>
                                <p>
                                    <Link to={'/about'} className='text-reset'>About</Link>
                                </p>
                                <p>
                                    <Link to={'/policy'} className='text-reset'>Policy</Link>
                                </p>
                                <p>
                                    <Link to={'/Contact'} className='text-reset'>Contact</Link>
                                </p>
                            </div>
                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color: "purple" }}>
                                    Best Selling
                                </h6>
                                <p>
                                    Laptops
                                </p>
                                <p>
                                    Mobiles
                                </p>
                                <p>
                                    Sunglasses
                                </p>
                                <p>
                                    Shoes
                                </p>
                            </div>
                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color: "purple" }}>
                                    Contact
                                </h6>
                                <p className='text-secondary'>
                                    <i className='fas fa-home me-3'></i>
                                    Mumbai,Maharashtra
                                </p>
                                <p className='text-secondary'>
                                    <i className='fas fa-envelope '></i>
                                    vrajeshshetty2000@gmail.com
                                </p>
                                <p className='text-secondary'>
                                    <i className='fas fa-phone me-3 text-secondary'></i>9137118747

                                </p>
                                <p className='text-secondary'>
                                    <i className='fas fa-print me-3 text-secondary'></i>9321229689
                                </p>
                            </div>
                        </div>
                    </div>


                </section>

                <div class="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "purple" }}>
                    © 2021 Copyright:Vrajesh Shetty

                </div>
            </footer>
        </>
    )
}

export default Footer
