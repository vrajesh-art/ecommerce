import React, { useState, useContext, createContext } from 'react'

// below we are creating the context named SearchContext
const SearchContext = createContext();



//we can access the state from anywhere doing these
const SearchProvider = ({ children }) => {
    // yaha pe hum context ko get kar rhe hai
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });



    return (
        //yahape humne isse children ke saath wrap kiya hai hum isse kahi par bhi as a children use kar sakte hai
        <SearchContext.Provider value={[auth, setAuth]}>
            {/* aise value ke through auth and setauth dene se hum ise kahi par bhi use kar sakte hai */}
            {children}
        </SearchContext.Provider>
    )
}

// custom hook
const useSearch = () => useContext(SearchContext)
export { useSearch, SearchProvider }