import './index.css';
import { useState, useEffect, useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import axios from 'axios';


const Cart = () => {
  const { state, addToCart, removeFromCart } = useContext(cartContext);
  // Local state to manage cart items.
  const [cartItems, setCartItems] = useState([]);
  // Accessing cart details from the context using useContext hook.
  const cartDetailsFromContext = useContext(cartContext);

  // Updating local state when the cart state in context changes.
  useEffect(() => {
    setCartItems(cartDetailsFromContext.state)
  }, [cartDetailsFromContext.state])


  // const user = {
  //   name: 'ABD', // Replace with the actual user's name
  //   email: 'sateeshch123@gmail.com', // Replace with the actual user's email
  //   // Add more user details as needed
  // };
  // const placeOrder = async () => {
  //   try {
  //     // Generate a unique order number (you might want to implement a proper order number generation logic)
  //     const orderNumber = generateOrderNumber();

  //     // Make an HTTP POST request to the backend API
  //     await axios.post('/api/placeOrder', {
  //       orderNumber,
  //       user,
  //       items: state,
  //     });
  //     // Optionally, you can clear the cart state or show a success message
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     // Handle errors (e.g., show an error message to the user)
  //   }
  // };

  // // Function to generate a unique order number (you might want to implement your own logic)
  // const generateOrderNumber = () => {
  //   return `ORDER-${Date.now()}`;
  // };

  // Component to render each item in the cart
  const CartItem = (props) => {
    const { eachItem } = props
    const { id, title, description, imgUrl, quantity, price } = eachItem;

    const handleIncrement = (id) => {
      addToCart({ id }); // Assuming addToCart is used to increment the quantity
    };

    const handleDecrement = (id) => {
      removeFromCart({ id }); // Assuming removeFromCart is used to decrement the quantity
    };

    return (
      <li className='cart-page__cart-items'>
        <img className='cart-page__product-img' src={imgUrl} alt="product img" />
        <div className='cart-page__product-item-details-wrapper'>
          <p className='cart-page__product-title'>{title}</p>
          <p className='cart-page__product-description'>{description}</p>
          <p className='cart-page__product-description'>Price:${price}</p>
          <p className='cart-page__product-description'>quantity: {quantity}</p>
          <p className='cart-page__product-description'>subtotal: {quantity * price}</p>
          <div className='cart-buttons'>
            <button className='cart-button-decrement' onClick={() => handleDecrement(id)}>
              <span className='minus'>-</span>
            </button>
            <input className='cart-button-quantity' value={quantity} readOnly />
            <button className='cart-button-increment' onClick={() => handleIncrement(id)}>
              <span className='minus'>+</span>
            </button>
          </div>
          <button className='remove-btn' onClick={() => cartDetailsFromContext.removeFromCart({ id })}>Remove</button>
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
      
      {/* Button to place the order
      <button className='place-order-btn' onClick={placeOrder}>
        Place Order
      </button> */}

      <ul className='cart-page__cart-items-card'>
        {cartItems.map(eachItem => <CartItem key={eachItem.id} eachItem={eachItem} />)}
      </ul>
    </div>
  )
}


export default Cart;