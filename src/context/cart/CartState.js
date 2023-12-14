import { useState, useEffect } from "react";
import CartContext from "./cartContext";


// Importing the CartContext for creating a context provider.
const CartState = (props) => {

    // Initializing the state using the useState hook, retrieving data from localStorage if available.
    const [state, setState] = useState(() => {
        const localData = localStorage.getItem('cartState');
        return localData ? JSON.parse(localData) : [];
    });
    
    // Effect hook to update localStorage whenever the cart state changes.
    useEffect(() => {
        localStorage.setItem('cartState', JSON.stringify(state));
    }, [state]);
    
    // useEffect(() => {
    //     // Update the length of the cart in your context or wherever you're using it.
    //     const cartLength = state.reduce((total, product) => total + product.quantity, 0);
    //     // Assuming you have a function setCartLength in your context to update the cart length.
    //     setCartLength(cartLength);
    //   }, [state]);

     // Function to add a product to the cart or update its quantity if already present.
    const addToCart = ({ id, imgUrl, title,description, price}) => {
        const existingProductIndex = state.findIndex(product => product.id === id);

        if (existingProductIndex !== -1) {
            // Product already exists in the cart, update the quantity
            const updatedCart = [...state];
            updatedCart[existingProductIndex].quantity += 1;
            setState(updatedCart);
        } else {
            // Product is not in the cart, add it with quantity 1
            setState([...state, { id, imgUrl, title,description, price, quantity: 1 }]);
        }
    };

    // Function to remove a product from the cart or decrease its quantity.
    const removeFromCart = ({ id}) => {
        const existingProductIndex = state.findIndex(product => product.id === id);

        const updatedCart = [...state];
        

        if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity === 1) {
            // If quantity is 1, remove the product from the cart
            const filteredArr = state.filter(product => product.id !== id)
            setState([...filteredArr]);
        }
        else if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity -= 1;
            setState(updatedCart);
        }
    };
    
   

    // Providing the cart state and related functions through the CartContext.Provider.
    return (
        <CartContext.Provider value={{state, addToCart, removeFromCart }}> 
            {props.children}
        </CartContext.Provider>
    )
}


export default CartState;