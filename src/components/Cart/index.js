import './index.css';
import { useState, useEffect } from 'react';


const Cart = () => {
  //state to store the cart items
  const [cartItems, setCartItems] = useState([])


  //useEffect hook to run logic when the component mounts
  useEffect(() => {
    // Retrieve cart items from local storage
    const productsFromLocalStorage = JSON.parse(localStorage.getItem("productsArr"))
    
    // Check if there are products in local storage
    if (productsFromLocalStorage) {
       // Create a map to efficiently handle duplicate products and count their quantity
      const productMap = new Map();
      
      // Iterate through each product in the retrieved array
      productsFromLocalStorage.forEach(product => {
        // Convert the product object to a JSON string to use it as a key in the map
        const key = JSON.stringify(product);
        
         // Check if the product is already in the map
        if (productMap.has(key)) {
          // If yes, increment the quantity
          productMap.get(key).quantity++;
        } else {
          // If not, add the product to the map with a quantity of 1
          productMap.set(key, { ...product, quantity: 1 });
        }
      });
      
      // Convert the values of the map back to an array to get unique products with quantities
      const uniqueProducts = Array.from(productMap.values());


     // Update the state with the unique products and quantities
      setCartItems(uniqueProducts)
    }


  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts



  // Function to handle increasing the quantity of a product in the cart and takes a productId as a parameter
  const handleIncreaseQuantity = (productId) => {
    // Use the map function to create a new array (updatedCart) by iterating over each item in cartItems
    const updatedCart = cartItems.map((item) => {
       // Check if the current item's id matches the provided productId
      if (item.id === productId) {
        // If there is a match, create a new object with the same properties as the current item
        // but with the quantity increased by 1
        return { ...item, quantity: item.quantity + 1 };
      }
      // If there is no match, return the current item unchanged
      return item;
    });
    
    // Update the state variable cartItems with the new array updatedCart
    setCartItems(updatedCart);
     // Call a function updateLocalStorage with the updatedCart to update local storage
    updateLocalStorage(updatedCart);
  };
  
  // Function to handle decreasing the quantity of a product in the cart
  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };
  
  // Function to remove a product from the cart
  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);

    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };


  // Function to update local storage with the latest cart data
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem('productsArr', JSON.stringify(updatedCart));
  };

  // Component to render each item in the cart
  const CartItem = (props) => {
    const { eachItem } = props
    const { id, title, description, images, quantity,price } = eachItem;

    return (
      <li className='cart-page__cart-items'>
        <img className='cart-page__product-img' src={images[0]} alt="product img" />
        <div className='cart-page__product-item-details-wrapper'>
          <p className='cart-page__product-title'>{title}</p>
          <p className='cart-page__product-description'>{description}</p>
          <p className='cart-page__product-description'>Price:{price}</p>
          <p className='cart-page__product-description'>quantity: {quantity}</p>
          <div>
            {/* Button to increase quantity */}
            <button className='incresing-btn' onClick={() => handleIncreaseQuantity(id)}>+</button>
            <button className='Add-button' type='Button'>Add</button>
            {/* Button to decrease quantity */}
            <button className='decreasing-btn' onClick={() => handleDecreaseQuantity(id)}>-</button>
          </div>
          <button className='remove-btn' onClick={() => handleRemoveItem(id)}>Remove</button>
        </div>
      </li>
    )

  }

   // Log the cartItems to the console for debugging
  console.log(cartItems)
  
  // Render the Cart component
  return (
    <div className='cart-page__bg-container'>
      <h1>Cart Items</h1>
      {/* Display cart counter */}
      {/* <p>Cart Count: {cartItemCount}</p> */}

      <ul className='cart-page__cart-items-card'>
        {cartItems.map(eachItem => <CartItem key={eachItem.id} eachItem={eachItem} />)}
      </ul>
    </div>
  )
}


export default Cart;