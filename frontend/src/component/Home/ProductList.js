import React, { useContext, useEffect, useState } from "react";

import { ProductContext } from "../../middlewares/global-state";
import Product from "./Product";
import axios from "axios";

const ProductList = () => {
  const { data } = useContext(ProductContext);
  const [currentData, setCurrentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(data.category);
  }, [data.category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/`,
          {
            params: {
              category: category === "all" ? "" : category,
              searchTerm: searchTerm,
            },
          }
        );
        setCurrentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category, searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center bg-light my-6">
      <div className="my-4 w-sm">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="text-xl">
        {data.category !== "all" ? (
          <p>
            Showing result of:{" "}
            {searchTerm
              ? `${searchTerm}`
              : `${
                  data.category.charAt(0).toUpperCase() + data.category.slice(1)
                }`}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="max-w-[1440] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-5 gap-8  p-6 ">
        {currentData?.length > 0 ? (
          currentData.map((data) => {
            return <Product key={data._id} product={data} />;
          })
        ) : (
          <div className="w-full">
            <p className="text-lg text-center">No Products to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
