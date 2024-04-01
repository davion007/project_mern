import { createContext } from "react";

export const ProductContext = createContext();

export const initialState = {
    query: {},
    isLoggedIn: false,
    currentVerify: "login",
    category: "all",
    loggedUser: {}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_product": {
            return {
                ...state,
                products: action.payload
            }
        }
        case "set_query": {
            return {
                ...state,
                query: action.payload,
            }
        }
        case "set_category": {
            return {
                ...state,
                category: action.payload
            }
        }

        case "set_cart": {
            return {
                ...state,
                cart: action.payload
            }
        }
        case "set_currentVerify": {
            return {
            ...state,
                currentVerify: action.payload
            }
        }

        case "SET_USER": {
            return {
                ...state,
                loggedUser: action.payload
            }
        }

        case "SET_ISLOGGED" :{
            return {
              ...state,
              isLoggedIn: action.payload
            }
        }
        default: {
            return 
        }
    }
}