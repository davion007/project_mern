import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ProductContext } from "../middlewares/global-state";
import { AiOutlineShoppingCart, AiOutlineShop } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(ProductContext);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const Logout = () => {
    Cookies.remove("authToken");
    setIsModalOpen(false);
    setCurrentData(null);
    navigate("/verify");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // console.log(currentData)
  return (
    <div className="w-full bg-primary flex justify-center text-white">
      <div className="w-full flex justify-between items-center max-w-7xl px-4 py-2">
        <div className="text-5xl">
          <Link to="/">
            <AiOutlineShop />
          </Link>
        </div>
        <div className=" text-semiwhite flex space-x-4 text-xl">
          <div className="flex items-center space-x-6 font-semibold ">
            {currentData && currentData.loggedUser.role === 1 ? (
              <>
                <Link to={`/dashboard`}>
                  <div className="flex space-x-2 cursor-pointer hover:underline">
                    <div className="text-2xl">
                      <AiOutlineShoppingCart />
                    </div>
                    <div className="text-xl">
                      <span>Dashboard</span>
                    </div>
                    <div className="text-xl"></div>
                  </div>
                  
                </Link>
                <Link to={`/addproduct`}>
                  <div className="flex space-x-2 cursor-pointer hover:underline">
                    <div className="text-2xl">
                      <AiOutlineShoppingCart />
                    </div>
                    <div className="text-xl">
                      <span>Add Product</span>
                    </div>
                    <div className="text-xl"></div>
                  </div>
                </Link>
              </>
            ) : (
              ""
            )}
            {currentData && currentData.loggedUser ? (
              <>
                <Link to={`/cart/`}>
                  <div className="flex space-x-2 cursor-pointer hover:underline">
                    <div className="text-2xl">
                      <AiOutlineShoppingCart />
                    </div>
                    <div className="text-xl">
                      <span>Cart</span>
                    </div>
                    <div className="text-xl">
                      {/* {currentCart?
                                                <span>({currentCart?.products?.length})</span>:""
                                            } */}
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-2 cursor-pointer hover:underline">
                  <div className="text-2xl">
                    <FaUserCircle />
                  </div>
                  <div className="text-xl relative">
                    <span onClick={() => toggleModal()}>
                      {data.loggedUser.name}
                    </span>
                    {isModalOpen ? (
                      <div className="bg-primary absolute -left-8 hover:underline">
                        <div className="p-2">
                          <p onClick={() => Logout()}>Logout</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
              <div>Login</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
