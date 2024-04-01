import React, {useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import { ProductContext } from '../../middlewares/global-state'

const Register = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [validEmail, setvalidemail] = useState(null);



    const {dispatch } = useContext(ProductContext)

    const navigate = useNavigate();


    const submitForm = async (e) => {
        e.preventDefault();

        setloading(true);
        await axios.post(`${process.env.REACT_APP_API_URL}/user/create`, {name,email, password})

            .then(res => {
                Cookies.set('authToken', res.data.token)
                navigate('/');
            })
            .catch(err => console.log(err))


        setloading(false);
    }


    function checkValidEmail(email) {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        if(email.match(pattern)) {
            setvalidemail(true);
            setemail(email);
        } else {
            setvalidemail(false);
        }

    }

    const openLogin = () => {
        dispatch({type:"set_currentVerify",payload:"login"})
      }
    

    return (
        <div>
        <div className="flex flex-col p-2 space-y-3 my-[3vh] border-2 border-black bg-white p-5">
            <form onSubmit={submitForm} className="form space-y-3">
                <div className="space-y-2">
                    <label className='flex flex-col' htmlFor="name">
                        <span className="text-lg ">Name</span>
                        <input className="p-1 text-black" id="name" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setname(e.target.value)} />
                    </label>

                    <label className='flex flex-col' htmlFor="email">
                        <span className="text-lg">Email</span>
                        <input className="p-1 text-black" id="email" type="text" placeholder="Enter Your email" onChange={(e) => checkValidEmail(e.target.value)} />
                        {validEmail === false ? <p className="text-red-500 text-xs">Email is invalid</p>:""}
                    </label>

                    <label className='flex flex-col' htmlFor="password">
                        <span className="text-lg">Password</span>
                        <input className='p-1  text-black' id='password' type="password" placeholder='Enter your password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </label>
                    <span className='text-blue-400 cursor-pointer underline'>Forgot your password?</span>
                </div>
                <div className='space-y-1'>

                    <button type="submit" className={`py-1 px-4 bg-primary rounded-lg text-white ${loading ? "opacity-50" : ""}`}
                        disabled={loading}>
                        {loading ? 'Register...' : 'Register'}
                    </button>
                    <div>
                        <span>Already Have an Account?</span>
                        <span className='text-blue-400 underline ml-2' onClick={()=> openLogin()}>Login</span>

                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Register