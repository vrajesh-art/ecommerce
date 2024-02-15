import React from 'react'

// handlesubmit,value and setValue ko hum as a props expect karenge
const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control" placeholder="Enter the category name" value={value}
                        onChange={(e) => setValue(e.target.value)} />

                </div>

                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm
