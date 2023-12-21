import './index.css';
import { useContext } from 'react';

import cartContext from '../../context/cart/cartContext';

const Checkout = () => {

    const cartDetailsFromContext = useContext(cartContext);

    const CheckoutItem = (props) => {
        const {eachItem} = props;
        const {id, imgUrl, isChecked, quantity, title,price} = eachItem;

        return (
            <li className='checkout-page-items'>
                <img className='' src={imgUrl} alt="checkout img"/>
                <p>{title}</p>
                <p>{quantity}</p>
                <p>{price}</p>
            </li>
        )
    }

     // Calculate the grand total
     //the reduce function is used to iterate over the checkoutArr array and calculate the sum of the product of quantity and price for each item
    const grandTotal = cartDetailsFromContext.checkoutArr.reduce(
     (total, item) => total + item.quantity * item.price,
    0
  );

    return (
        <div className='checkout-page__bg-container'>
            <h1>Checkout</h1>
            {cartDetailsFromContext.checkoutArr.map(eachItem => <CheckoutItem key={eachItem.id} eachItem={eachItem}/>)}
            <div>
            <p className='grandtotal'>Grand Total: ${grandTotal.toFixed(2)}</p>
                <button type='button' className='buynow-button'>Buy Now</button>
            </div>
        </div>
    )
}


export default Checkout;