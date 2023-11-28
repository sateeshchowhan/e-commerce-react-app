import './index.css';
import React from 'react'
import { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
//import popup from '../Popups/popup';



const categoryArr = [
    {
        id: '1',
        category: 'All',
        group: 'footwear'
    },
    {
        id: '2',
        category: 'Sneakers',
        group: 'footwear'
    },
    {
        id: '3',
        category: 'Flats',
        group: 'footwear'
    },
    {
        id: '4',
        category: 'Sandals',
        group: 'footwear'
    },
    {
        id: '5',
        category: 'Heels',
        group: 'footwear'
    },
] 


const priceArr = [
    {
        id: '1',
        price: 'All',
        group: 'prices'
    },
    {
        id: '2',
        price: '$0-50',
        group: 'prices'
    },
    {
        id: '3',
        price: '$50-100',
        group: 'prices'
    },
    {
        id: '4',
        price: '$100-150',
        group: 'prices'
    },
    {
        id: '5',
        price: 'Over $150',
        group: 'prices'
    },
] 



const colorsArr = [
    {
        id: '1',
        color: 'All',
        group: 'colors'
    },
    {
        id: '2',
        color: 'Black',
        group: 'colors'
    },
    {
        id: '3',
        color: 'Red',
        group: 'colors'
    },
    {
        id: '4',
        color: 'Green',
        group: 'colors'
    },
    {
        id: '5',
        color: 'White',
        group: 'colors'
    },
] 




const Products = () => {


    const [products, setProducts] = useState()
    
    //const [buttonpopup, setButtonpopup] =useState(false);

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        // const url ='http://localhost:8080/products'
        // const url ='https://jsonplaceholder.typicode.com/users'
        const url ='https://dummyjson.com/products'
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)

        if (!response.ok) {
            alert("Backend Error")
        }
        else {
            setProducts(data.products)
        }
    }





    const CategoryItem = (props) => {
        const {eachItem} = props;
        const {category, group} = eachItem;

        return (
            <li className='products-page__sidebar-filter-items'>
                <input type='radio' name={group} className='products-page__sidebar-filter-input-ele' value={category} />
                <p className='products-page__sidebar-filter-items-names'>{category}</p>
            </li>
        )
    } 
    
    
    

    const PriceItem = (props) => {
        const {eachItem} = props;
        const {price, group} = eachItem;
        
        return (
            <li className='products-page__sidebar-filter-items'>
                <input type='radio' name={group} className='products-page__sidebar-filter-input-ele' value={price} />
                <p className='products-page__sidebar-filter-items-names'>{price}</p>
            </li>
        )
    } 
    
    
    
    const ColorsItem = (props) => {
        const {eachItem} = props;
        const {color, group} = eachItem;
        
        return (
            <li className='products-page__sidebar-filter-items'>
                <input type='radio' name={group} className='products-page__sidebar-filter-input-ele' value={color} />
                <p className='products-page__sidebar-filter-items-names'>{color}</p>
            </li>
        )
    } 

    


    const sidebarComponent = () => {
        return(
            <aside className='products-page__sidebar-container'>

                <p className='products-page__sidebar-filter-titles'>Category</p>

                <ul className='products-page__sidebar-filter-section'>
                    {categoryArr.map(eachItem => <CategoryItem key={eachItem.id} eachItem={eachItem}/>)}
                </ul> 

                <p className='products-page__sidebar-filter-titles'>Price</p>

                <ul className='products-page__sidebar-filter-section'>
                    {priceArr.map(eachItem => <PriceItem key={eachItem.id} eachItem={eachItem}/>)}
                </ul> 

                <p className='products-page__sidebar-filter-titles'>Colors</p>

                <ul className='products-page__sidebar-filter-section'>
                    {colorsArr.map(eachItem => <ColorsItem key={eachItem.id} eachItem={eachItem}/>)}
                </ul> 
            </aside>
        )
    }
    
        
    const alertFunction = ( title, description, images)=>{
        //Function to display a SweetAlert2 popup, with an object of options, all being optional. 
        Swal.fire({
            title,
            text: description,
            imageUrl: images[0],//'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "product image"
          });
      };
    
    
    const ProductItem = (props) => {
        const {product} = props 
        const {title, description, images} = product
      
        //defined a function
        const handleOnclickAddToCartBtn = (addedProduct) => {
            // Retrieve the "productsArr" from localStorage and parse it as JSON.
          // If the "productsArr" is not present in localStorage, initialize an empty array.
            let productsArrFromLocalStorage = JSON.parse(localStorage.getItem("productsArr")) || [];
            // Push the addedProduct parameter into the productsArrFromLocalStorage array.
            productsArrFromLocalStorage.push(addedProduct);
             // Convert the updated productsArrFromLocalStorage array to JSON and store it back in localStorage with the key "productsArr".
            localStorage.setItem("productsArr", JSON.stringify(productsArrFromLocalStorage));
        }

        
        return (

            <li className='products-page__product-item'>
                <img className='products-page__product-img' src={images[0]} alt="product img" width='100%' height="100%" />
                <h3 className='products-page__product-title'>{title}</h3>
                <p className='products-page__product-description'>{description}</p>
               {/*when view button is clicked it calls alert fun. and required details are passed as arguments to that fun. */}
                <button className='products-page__product-button' onClick={()=>alertFunction(title, description, images)}>View</button> 
                <button className='products-page__product-button' onClick={() => handleOnclickAddToCartBtn(product)}>Add</button>
            </li>
        
            // <li className='products-page__product-item'>
            //     <Link to={`/product/${id}`} className='products-page__product-link-item'>
            //         <div className='products-page__product-item-details-wrapper'>
            //         <img className='products-page__product-img' src={images[0]} alt="product img" /> ,  
            //             <p className='products-page__product-title'>{title}</p>
            //           <p className='products-page__product-description'>{description}</p>,
            //           <button className='products-page__product-button'>Add</button>
            //         </div>
            //     </Link>
            // </li>
        );
    }
    


    const productsComponent = () => {
        return (
            <ul  className='products-page__products-section'>
                {products && products.map(product => <ProductItem key={product.id} product={product} />)}
            </ul>
        )
    }


    return (
        <div className='products-page__bg-container'>
            {/* sidebar for filtering products */}
            {sidebarComponent()}



            {/* Products container */}
            {productsComponent()}
        </div>
    )
}


export default Products;