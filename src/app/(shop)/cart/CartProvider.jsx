'use client'
import { createContext, useContext, useState } from "react"

const CartContext = createContext ()

const CartProvider = ({children}) => {

const [cartItems, setCartItems] = useState([]);
const [total, setTotal] = useState(0);

const addToCart = (product) => {
  setCartItems([...cartItems, product])
  setTotal (total + 1);
}

const removeFromCart = () => {
  setCartItems([]);
  setTotal (total-1);
}

  return (
    <CartContext.Provider value={{cartItems, total, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);
export default CartProvider;
