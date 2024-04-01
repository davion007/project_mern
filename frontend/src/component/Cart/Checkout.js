import React from 'react'

const Checkout = ({total}) => {
  return (
    <div className='w-full md:max-w-xs h-max flex justify-between'>
    <div className='w-full'>
        <div className="text-center text-2xl flex justify-center py-5  bg-white">
            <p>Total </p>
            <p>{`: $${total}`}</p>
        </div>
        <div className="text-center text-2xl flex justify-center my-2 px-2">
            <button className="btn bg-primary text-white rounded-sm" onClick={() => alert("Comming SOON")}>Checkout</button>
        </div>
    </div>
</div>
  )
}

export default Checkout
