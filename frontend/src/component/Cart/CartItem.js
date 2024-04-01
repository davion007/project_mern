import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const CartItem = ({ productItem, removeProduct, updateProductQuantity }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(productItem);
  }, [productItem]);



  return (
    <>
      {product ? (
        <div
          key={product._id}
          className="border-b-2 p-4 flex flex-col sm:flex-row "
        >
          <div className=" flex items-center justify-center h-full">
            <img
              src={product.productId.imageUrl}
              alt={product.productId.title}
              className="max-w-[14rem] md:min-w-[14rem] object-cover"
            />
          </div>

          <div className="mx-10 py-5">
            <h2 className="text-lg font-semibold mb-2">
              {product.productId.title}
            </h2>

            <p className="text-gray-800 text-xl">${product.productId.price}</p>
            <div className="flex justify-center items-center w-min my-5">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-l"
                onClick={() => updateProductQuantity("remove", product.productId._id, 1)}
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <div className="mx-4">{product.quantity}</div>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r"
                onClick={() => updateProductQuantity("add", product.productId._id, 1)}
              >
                +
              </button>
            </div>
            <div className="text-lg space-x-2">
              <button
                className="font-bold"
                onClick={() => alert("Comming SOON")}
              >
                Save for Later
              </button>
              <button
                className="text-red-600 font-bold"
                onClick={() => removeProduct(product.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading....."
      )}
    </>
  );
};

export default CartItem;
