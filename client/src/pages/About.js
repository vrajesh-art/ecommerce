import React from 'react'
import Layout from '../components/layout/Layout'
import about from '../images/aboutus.jpg'

const About = () => {
    return (
        <Layout title={'About us-Ecommerce App'}>
            <div className='text-center text-lg-start bg-light'>
                <div className='d-flex flex-column p-4 justify-content-center align-items-center text-wrap text-secondary'>



                    <h1 className='p-2 text-center' style={{ color: "purple" }}>About Us</h1>

                    <div className='aboutus-info'>
                        <p className="mt-3 text-dark w-4 fs-3">
                            At Our Ecommerce Website, we're dedicated to bringing you the latest trends and high-quality products at affordable prices. With a passion for convenience and a commitment to customer satisfaction, we strive to make your online shopping experience effortless and enjoyable. Explore our wide range of products, from fashion and electronics to home essentials, and discover the perfect items to enhance your lifestyle. Shop with confidence, knowing that your satisfaction is our top priority
                        </p>
                    </div>




                </div>



            </div>
        </Layout >
    )
};
Layout.defaultProps = {
    title: "Ecommerce Website-shop Here",
    description: "mern Project",
    keywords: "mern,react,node,mongodb",
    author: "Vrajesh"
}

export default About
