import './index.css';
import { useContext,useState,useEffect } from 'react';

import cartContext from '../../context/cart/cartContext';
import axios from 'axios'; 
const Checkout = () => {

    const cartDetailsFromContext = useContext(cartContext);
    const [orderPlaced, setOrderPlaced] = useState({ items:"", total:"" });
    const [addressDetails, setAddressDetails]= useState({items:"", total:"" ,country:'',fullName:'',houseName:'',mandalName:'',mobileNumber:'',pincode:'',stateName:'',villName:''})


    // const placeOrder = async () => {
    //     try {
    //         // Extract relevant information from cart context
    //         const { userId, checkoutArr } = cartDetailsFromContext;

    //         // Create an array of items with required fields
    //         const items = checkoutArr.map(({ id, quantity, price }) => ({ productId: id, quantity, price }));

    //         // Calculate the total
    //         const total = checkoutArr.reduce((total, item) => total + item.quantity * item.price, 0);
    //         // Make a POST request to place the order
    //         const response = await axios.post('/api/orders/place', { userId, items, total });
    //         console.log('Placing order...', { userId, items, total });
    //         // Check if the order placement was successful
    //         if (response.data.success) {
    //             setOrderPlaced(true);
    //             // Optionally, you can perform additional actions here, such as updating the UI or redirecting the user.
    //         } else {
    //             // Handle the case where order placement fails
    //             console.error('Order placement failed:', response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error placing order:', error.message);
    //     }
    // };


    const CheckoutItem = (props) => {
        const { eachItem } = props;
        const { id, imgUrl, isChecked, quantity, title, price } = eachItem;

        return (
            <li className='checkout-page-items'>
                <img className='' src={imgUrl} alt="checkout img" />
                <p>{title}</p>
                <p>{quantity}</p>
                <p>{price}</p>
            </li>
        )
    }
    
    // const placeOrder = async ()=>{
    //     const userId = localStorage.getItem('userId');
    //     const url = `${userId};
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     console.log(data);
    //     console.log(data.addressDetails);
    //     const {items, total }

    //     setOrderPlaced({ items, total })
    // }

    const addressFunc = async () => {
        const userId = localStorage.getItem("userId")
        const url = `http://localhost:8080/address/getAddress/${userId}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.addressDetails);
        const {items,total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName} = data.addressDetails[0];


        setAddressDetails({items, total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName})
    }


    useEffect(() => {
        addressFunc()
        // placeOrder()
    }, [])



    // Calculate the grand total
    //the reduce function is used to iterate over the checkoutArr array and calculate the sum of the product of quantity and price for each item
    const grandTotal = cartDetailsFromContext.checkoutArr.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    return (
        <div className='checkout-page__bg-container'>
            <h1>Checkout</h1>
            {cartDetailsFromContext.checkoutArr.map(eachItem => <CheckoutItem key={eachItem.id} eachItem={eachItem} />)}
            <div>
            <ul className='checkout-page__checkout-address-card'>
                {console.log(addressDetails)}
                <li className='checkout-page__checkout-address-card-items address-text'>Address:</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.fullName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.houseName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.streetName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.villName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.mandalName}, {addressDetails.stateName}, {addressDetails.pincode}</li>
            </ul>

            <div className='checkout-page__checkout-payment-card'>
                Payment  
            </div>

                <p className='grandtotal'>Grand Total: ${grandTotal.toFixed(2)}</p>
                {!orderPlaced ? (
                    <button type='button' className='buynow-button' >
                        Buy Now
                    </button>
                ) : (
                    <p>Your order has been placed successfully!</p>
                )}
            </div>
        </div>
    )
}


export default Checkout;