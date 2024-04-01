import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductContext } from '../middlewares/global-state';
import Cookies from 'js-cookie';

const ProductPage = () => {
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/${params.id}`)
      .then(res => setCurrentProduct(res.data))
      .catch(err => console.log(err))
  }, [params.id])


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }
    if (rating - fullStars >= 0.5) {
      stars.push(<BsStarHalf key={stars.length} />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={stars.length} />);
    }
    return stars;
  }

  const handleAddToCart = (e) => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cart/add`,
        { productId: currentProduct._id, quantity: 1 },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          navigate("/cart");
        }
      })
      .catch((err) => console.error(err));
    e.stopPropagation();
  };

  return (
    <>{currentProduct ?
      <div className='w-full flex justify-center my-6 bg-light px-4'>
        <div className='w-full max-w-7xl border-2 flex flex-col md:flex-row justify-between bg-white mb-4 shadow-lg'>
          <div className='w-full md:w-5/12 p-4 text-center'>
            <div className='border-2 p-4'>
              <img src={currentProduct.imageUrl} alt="" className='max-h-[80vh]' />
            </div>

          </div>
          <div className='w-full md:w-7/12 flex flex-col  p-4 space-y-4'>
            <div>
              <h1 className="text-3xl font-bold">{currentProduct.title}</h1>
            </div>
            <div className='pr-4'>
              <p className='text-xl text-slate-500'>{currentProduct.description}</p>
            </div>
            <div className='flex space-x-4'>
              <div className='flex space-x-2 text-yellow-600 items-center'>
                {renderStars(currentProduct.rating)}
                <p>{currentProduct.rating.rate}</p>
              </div>
              <p>({currentProduct.rating})</p>
            </div>
            <div>
              <p className='text-2xl'>${currentProduct.price}</p>
            </div>
            <div className="space-x-3 mt-4">
              <button className='bg-primary text-white btn' onClick={handleAddToCart}>Add to Cart</button>
              <button className='bg-light text-black btn' onClick={handleAddToCart}>Buy Now</button>
            </div>
          </div>
        </div>
      </div> :
      ""
    }
    </>
  )
}

export default ProductPage
