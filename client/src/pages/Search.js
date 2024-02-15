
import React from 'react'
import { useParams } from 'react-router-dom'
// below we are importing the custom hook that we created
import { useSearch } from '../context/search'
import Layout from '../components/layout/Layout'

const Search = () => {
    // values ko get karlenge
    const [values, setvalues] = useSearch();



    return (
        <Layout title={'search results'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6>{values?.results.length < 1 ? 'No products found' : `found ${values?.results.length} in ''${values.keyword}`}''</h6>

                    <div className="d-flex flex-wrap mt-4 justify-content-center">
                        {
                            values?.results.map((p) => (
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} alt="" className='card-img top' />

                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}
                                        </p>
                                        <div className="card-text">$ {p.price}</div>
                                        <button className='btn btn-primary ms-1'>More details</button>
                                        <button className='btn btn-secondary ms-1'>Add to cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Search
