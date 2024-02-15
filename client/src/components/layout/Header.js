import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import toast from 'react-hot-toast';
import { FaShopify } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import SearchInput from '../form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'
const Header = () => {
    // yahape below mein hum categories joh humne return kiya tah use idhar get kar rhe hai
    const categories = useCategory()
    const [auth, setAuth] = useAuth()
    const [cart] = useCart()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Logout successfully')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand"><FaShopify style={{ color: "purple", fontSize: "25px", padding: "2px" }} />Ecommerce App</Link>
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
                        <SearchInput />
                        <li className="nav-item ">
                            <NavLink className="nav-link " to={'/'}>Home <span className="sr-only">(current)</span></NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to={'/Categories'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>


                            <ul className="dropdown-menu">
                                <li>
                                    <Link className='dropdown-item' to={'/Categories'}>
                                        All Categories
                                    </Link>
                                </li>
                                {categories?.map((c) => (
                                    <li><Link className="dropdown-item" to={`/category/${c.slug}`} >{c.name}</Link></li>
                                ))}
                            </ul>

                        </li>

                        {/* <li className="nav-item ">
                            <NavLink className="nav-link" to={'/category'}>Category <span className="sr-only">(current)</span></NavLink>
                        </li> */}
                        {//agar auth ke andar user nhi milta toh ek cheez karo waerna ek cheez karo
                            !auth.user ? (<>   <li className="nav-item">
                                <NavLink className="nav-link" to={'/Register'}>Register</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                                </li></>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink></li>
                                            <li >
                                                <NavLink className="dropdown-item" to={'/Register'} onClick={handleLogout}>logout</NavLink>
                                            </li>

                                        </ul>
                                    </li>


                                </>)
                        }


                        <li className="nav-item">
                            <Badge count={cart?.length}>
                                <NavLink className="nav-link" to={'/cart'} style={{ fontSize: '20x' }}>Cart</NavLink>
                            </Badge>
                        </li>

                    </ul>

                </div>
            </nav ></>
    )
}

export default Header
