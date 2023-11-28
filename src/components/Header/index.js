import React from 'react';
import './index.css';
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const tabItemsArr = [
    {
        id: '1',
        tabTitle: 'wishlist',
        path: '/liked-products',
        icons: <AiOutlineHeart className='header-page__tab-icons' />
        
    },
    {
        id: '2',
        tabTitle: 'cart',
        path: '/cart',
        icon: <AiOutlineShoppingCart className='header-page__tab-icons' />
    },
]

const Header = () => {


    const TabItem = (props) => {
        const {tab} = props;
        const {icon, path,icons} = tab;

        return (
            <li className='header-page__header-tab-items'>
                <Link to={path} className='header-page__header-link-items'>
                    {icon}{icons}
                </Link>
            </li>
        )
    }


    return (
        <nav className='header-page__header-section'>
            <img className='header-page__header-logo' src='/logo192.png' alt='company logo'/>

            <ul className='header-page__header-tabs-card'>
                {tabItemsArr.map(tab => <TabItem key={tab.id} tab={tab} />)}
            </ul>
        </nav>
    )
}


export default Header;