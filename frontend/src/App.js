import { useEffect, useReducer } from 'react'
import { Routes, BrowserRouter, Route } from "react-router-dom"
import axios from 'axios';

import { ProductContext, initialState, reducer } from './middlewares/global-state'

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Verify from './pages/Verify';
import Protected from './middlewares/protected';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';

function App() {
  const [data, dispatch] = useReducer(reducer, initialState)

  return (
    <BrowserRouter >
      <ProductContext.Provider value={{ data: data, dispatch: dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Protected><Home /></Protected> } />
          <Route path="/addproduct" element={<Protected><AddProduct /></Protected> } />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected> } />
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/cart" element={<Protected><Cart/></Protected>}/>
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </ProductContext.Provider>
    </BrowserRouter>
  );
}

export default App;
