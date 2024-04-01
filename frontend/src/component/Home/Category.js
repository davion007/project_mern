import React, { useContext } from 'react'
import { ProductContext } from '../../middlewares/global-state'


const Category = ({ category }) => {
    const { data,dispatch } = useContext(ProductContext);


    const handleCategory = async () => {
        dispatch({type: 'set_category', payload: category})
    }

    return (
        <div  className={`${data?.category === category ? 'bg-green-700 text-white' : 'bg-secondary text-white'} py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-3 mx-4 cursor-pointer select-none`} onClick={handleCategory}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
    )


}

export default Category
