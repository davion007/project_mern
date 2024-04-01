import React, { useState } from 'react'
import Category from './Category';

const Categories = () => {
    const [category, setCategory] = useState(["Men's", "Women's", "Kids", "Jeans","Sarees", "Summer","Winter"]);


    return (
        <div className="w-full  flex justify-center my-4">
            <div className="space-x-4 flex max-w-6xl flex-wrap">
                <Category key="all" category={"all"} />
                {category && category?.map(cat => {
                    return <Category key={cat} category={cat} />
                })}
            </div>
        </div>
    )
}



export default Categories
