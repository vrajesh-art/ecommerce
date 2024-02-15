import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

// we are destructuring the children below
const Layout = ({ children, description, title, author, keywords }) => {

    return (

        <div>
            <Header />
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='Keywords' content={keywords} />
                <meta name='author' content={author} />

                <title>{title}</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <main style={{ minHeight: "100vh" }}>

                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
