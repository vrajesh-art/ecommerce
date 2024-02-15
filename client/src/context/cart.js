import { useState, useContext, createContext, useEffect } from 'react'

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // initial time pe batana padega usko ki cart pe item hai varna woh show nhi kargea
    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart')
        // agar local storage mein cart milta hai to fir usko store kardho
        if (existingCartItem) setCart(JSON.parse(existingCartItem))
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
};
// below is the custom hook
const useCart = () => useContext(CartContext);
export { useCart, CartProvider }