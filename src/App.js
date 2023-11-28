import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import LikedProducts from './components/LikedProducts';
import Cart from './components/Cart';



function App() {
  return (
    <div className="app-bg-container">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path='/liked-products' element={<LikedProducts/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
