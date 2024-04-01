import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../middlewares/global-state'
import Cookies from 'js-cookie'
import axios from 'axios'

const Protected = ({ children }) => {
    const {data, dispatch } = useContext(ProductContext);
    const navigate = useNavigate();
    let headers
    const token = Cookies.get('authToken');

    useEffect(() => {
        headers = { 'Authorization': `Bearer ${token}` }
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, { headers })
                .then(res => {
                    dispatch({type:"SET_USER",payload:res.data})
                    dispatch({type:"SET_ISLOGGED",payload:true})
                    // console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                    navigate('/verify')
                })
        }
        fetchData();

    }, [token]);


    return (
        <>
            {children}
        </>
    )
}

export default Protected