import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useCategory() {
    const [categories, setCategories] = useState([])

    // here we will be getting all the categories

    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    // yahape neeche hum iss function ko initial time pe run karenge using useEffect
    useEffect(() => {
        getCategories()
    }, [])

    // hum return kar rhe hhai taaki isse hum kidhar bhi use kar sake
    return categories;
}