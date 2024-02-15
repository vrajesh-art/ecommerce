import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Spinner = ({ path = 'login' }) => {

    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => --count)
        }, 1000);
        //agar kuch value pass nhi karaya toh login pe jaayega else joh pass karaya hai uspe jaayega
        count === 0 && navigate(`/${path}`, { state: location.pathname, })
        return () => clearInterval(interval)
    }, [count, navigate, location, path])
    //navigate ke bina bhi chalega parr y daal diya hai
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "100vh" }}>
                <h1 className='text-center'>Redirecting to you in {count} Second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
