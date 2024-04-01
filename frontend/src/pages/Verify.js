import React, { useContext, useEffect, useState } from 'react'
import Login from '../component/Verify/Login'
import Register from '../component/Verify/Signup';
import { ProductContext } from '../middlewares/global-state';

const Verify = () => {
  const { data} = useContext(ProductContext)
  const [currentVerify, setCurrentVerify] = useState("login");

  useEffect(() => {
    setCurrentVerify(data.currentVerify)
  }, [data.currentVerify])


  return (
    <div className='w-full flex justify-center bg-light min-h-screen'>
      { currentVerify==="login"? 
      <Login/>:
      currentVerify==="register"?
      <Register/>:null
      }
    </div>
  )
}

export default Verify