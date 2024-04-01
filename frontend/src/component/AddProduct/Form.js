import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../middlewares/global-state";
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data } = useContext(ProductContext);
  const [categoryArray] = useState([
    "Men's",
    "Women's",
    "Kids",
    "Jeans",
    "Sarees",
    "Summer",
    "Winter",
  ]);

  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("rating", rating);
    if (image !== "") {
      formData.append("image", image);
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/product/create`, formData)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-light">
      <div className="max-w-3xl h-min w-10/12 md:w-3/5 flex flex-col bg-primary mt-10 p-3 space-y-3 shadow-lg mb-10">
        <form onSubmit={submitData}>
          <div className="border-white border-b-2 space-y-4">
            <div className="text-center text-2xl text-white font-bold">
              Add Product
            </div>
            <div className="w-full">
              <label>
                <span className="text-white text-xl font-semibold">Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full rounded-md p-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="text-white text-xl font-semibold">
                  Description
                </span>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="Text (optional)"
                  className="w-full rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="text-white text-xl font-semibold mr-2">
                  Category
                </span>
                <select
                  name="Category"
                  id="Category"
                  className="input-form"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="None">Product Category</option>
                  {categoryArray &&
                    categoryArray.map((cat) => {
                      return (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div className="w-full">
              <label>
                <span className="text-white text-xl font-semibold">Price</span>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full rounded-md p-1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div className="w-min">
              <label className="">
                <span className="text-white text-xl font-semibold">
                  Rating: {rating}
                </span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={rating}
                  className="w-full rounded-md p-1"
                  onChange={(e) => setRating(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              <input
                className="text-white "
                type="file"
                accept="image/*"
                name="file"
                id="file"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div className="mb-4">
              {imagePreview && (
                <img src={imagePreview} alt="" className="h-screen w-min" />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end my-4 space-x-4">
            <button
              type="submit"
              className=" bg-white py-1 px-4 hover:bg-slate-200"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
