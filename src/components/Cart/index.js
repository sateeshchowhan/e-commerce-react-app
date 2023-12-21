import './index.css';
import { useState, useEffect, useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const cartDetailsFromContext = useContext(cartContext);


  // const { state, addToCart, removeFromCart } = useContext(cartContext);
  // // Local state to manage cart items.
  // const [cartItems, setCartItems] = useState([]);
  // // Accessing cart details from the context using useContext hook.
  // const cartDetailsFromContext = useContext(cartContext);

  // // Updating local state when the cart state in context changes.
  // useEffect(() => {
  //   setCartItems(cartDetailsFromContext.state)
  // }, [cartDetailsFromContext.state])

  // Component to render each item in the cart
  const CartItem = (props) => {
    const { cartItem } = props;
    const { id, title, description, imgUrl, quantity, price, isChecked} = cartItem;
    
   
    // const handleIncrement = (id) => {
    //   addToCart({ id }); // Assuming addToCart is used to increment the quantity
    // };

    // const handleDecrement = (id) => {
    //   if (quantity>1){
    //     removeFromCart({ id }); // Assuming removeFromCart is used to decrement the quantity
    //   }
    // };
    
    // const handleRemove = (id) => {
    //   removeFromCart({ id });
    // };

    return (
      <li className='cart-page__cart-items'>
        <input
          type="checkbox"
          name={title}
          checked={isChecked}
          onChange={() => cartDetailsFromContext.toggleCheckbox({ id })}
        />
        <img className='cart-page__product-img' src={imgUrl} alt="product img" />
        <div className='cart-page__product-item-details-wrapper'>
          <p className='cart-page__product-title'>{title}</p>
          <p className='cart-page__product-description'>{description}</p>
          <p className='cart-page__product-description'>Price: ${price}</p>
          <p className='cart-page__product-description'>quantity: {quantity}</p>
          <p className='cart-page__product-description'>subtotal: {quantity * price}</p>
          <div className='cart-buttons'>
            {/* <button className='cart-button-decrement' onClick={() => handleDecrement(id)}>
              <span className='minus'>-</span>
            </button>
            <input className='cart-button-quantity' value={quantity} readOnly />
            <button className='cart-button-increment' onClick={() => handleIncrement(id)}>
              <span className='minus'>+</span>
            </button> */}
            <button
            type="button"
            className="cart-page__cart-item-decrement-btn"
            onClick={() => cartDetailsFromContext.removeFromCart({ id })}
           >
            -
           </button>
           <p className="cart-page__cart-item-title">{quantity}</p>
           <button
            type="button"
            className="cart-page__cart-item-increment-btn"
            onClick={() => cartDetailsFromContext.addToCart({ id, imgUrl, title })}
           >
            +
           </button>

          </div>
          {/* <button className='remove-btn' onClick={() => handleRemove(id)}>Remove</button> */}
        </div>
      </li>
    )

  }

  // Log the cartItems to the console for debugging
  // console.log(cartItems)
  const handleOnclickCheckout = () => {
    cartDetailsFromContext.filterCheckoutItemsArr(cartDetailsFromContext.state)
    navigate('/checkout');
  }

  // Render the Cart component
  return (
    <div className='cart-page__bg-container'>
      <h1>Cart Items</h1>
      {/* Display cart counter */}
      {/* <p>Cart Count: {cartItemCount}</p> */}
      
      {/* Button to place the order */}
      {/* <button className='place-order-btn' onClick={placeOrder}>
        Place Order
      </button>  */}

      {/* <ul className='cart-page__cart-items-card'>
        {cartItems.map(eachItem => <CartItem key={eachItem.id} eachItem={eachItem} />)}
      </ul>
      <button type="button" onClick={() => handleOnclickCheckout()}>
        Checkout
      </button> */}
       <ul className="cart-page__cart-items-wrapper">
        {cartDetailsFromContext.state.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <button type="button" onClick={() => handleOnclickCheckout()}>
        Checkout
      </button>


    </div>
  )
}


export default Cart;