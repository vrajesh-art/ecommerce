import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <Layout title={'Go Back-Page not found'}>
            <div className='pna'>
                <h1 className='pna-heading'>Oops !</h1>
                <h2 className='pna-content'>404 Page Not Available</h2>
                <div className='pna-button'><Link to={'/'} href="" />Back Home<Link /></div>
            </div>
        </Layout>
    )
}

export default Pagenotfound
