


import {DATA_FROM_SEARCH,
GET_SELLERS_BEGIN,
  GET_SELLERS_SUCCESS,
  GET_SELLERS_ERROR,} from "./actions"


export  const reducer = (state, action)=>{
switch (action.type){
    case DATA_FROM_SEARCH: 
    return{
        ...state, ...action.payload
    }
    default: return state
}
}
const sellers_reducer = (state, action) => {
  if (action.type === GET_SELLERS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_SELLERS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    };
  }
  if (action.type === GET_SELLERS_ERROR) {
    return { ...state, sellers_loading: false, sellers_error: true };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default sellers_reducer;