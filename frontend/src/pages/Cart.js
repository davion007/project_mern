import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../middlewares/global-state";
import Cookies from "js-cookie";
import axios from "axios";
import Checkout from "../component/Cart/Checkout";
import CartItem from "../component/Cart/CartItem";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const token = Cookies.get("authToken");
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .get(`${process.env.REACT_APP_API_URL}/cart/`, { headers })
        .then((res) => {
          setCartProducts(res.data.cart.products);
        });
    };
    fetchCartProducts();
  }, []);

  const updateProductQuantity = (action, productId, quantity) => {
    // Send API request to update product quantity
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    if (action === "add") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/cart/add`,
          { productId, quantity: 1 },
          { headers }
        )
        .then((res) => {
          setCartProducts(res.data.cart.products);
        })
        .catch((err) => console.error(err));
    }

    if (action === "remove") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/cart/decrease`,
          { productId, quantity: 1 },
          { headers }
        )
        .then((res) => {
          setCartProducts(res.data.cart.products);
        })
        .catch((err) => console.error(err));
    }
  };

  const removeProduct = (productId) => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cart/remove`,
        { productId, quantity: 1 },
        { headers }
      )
      .then((res) => {
        setCartProducts(res.data.cart.products);
      })
      .catch((err) => console.error(err));
  };

  const calculateTotal = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.productId.price * product.quantity;
    });
    return total.toFixed(2);
  };

  const total = calculateTotal();
  console.log(cartProducts);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center my-6 bg-light md:space-x-4 px-4">
      <div className="w-full max-w-2xl border-2 flex justify-between bg-white mb-4 shadow-lg ">
        {cartProducts.length > 0 ? (
          <div className="transition-all ease-in-out delay-75">
            {cartProducts.map((product) => (
              <CartItem
                key={product.productId._id}
                productItem={product}
                removeProduct={removeProduct}
                updateProductQuantity={updateProductQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <p className="text-lg text-center">Your cart is empty.</p>
          </div>
        )}
      </div>
      <Checkout total={total} />
    </div>
  );
};

export default Cart;
