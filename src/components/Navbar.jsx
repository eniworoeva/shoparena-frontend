import { useState, useEffect } from "react"
import React from "react"
import {Link} from "react-router-dom"
import {useAppContext} from "../context/ContextUse"
import axios from "../axios"


const initialState = {
  category:"",
  lowerPrice:"",
  upperPrice:"",
  sort:""
  }

export default function Navbar(){
  const { handleSearch} = useAppContext()
  const [user, setUser] = useState(null)
  const [input, setInput] = useState(initialState)


  const handleSubmit = (e)=>{
    e.preventDefault()
    handleSearch(input)
  }
  const handleChange = (e)=>{
setInput({...input, [e.target.name]:e.target.value})
// console.log(e)
  }

  
  const getSellerProfile = async () => {
    console.log(localStorage.token)
    try {
      const headers = {
          "Authorization": `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        }
      const resp = await axios.get("/getbuyerprofile", {headers: headers})
      console.log(resp.data.data.first_name)
      setUser(resp.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      getSellerProfile()
    }
    
  }, [])
    return(
        <>
        <header className="yellow-header">
          <div className="header__area">
            <div className="header__top d-none d-sm-block">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-5 d-none d-md-block">
                    <div className="header__welcome">
                      <span>Welcome to OJA</span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-7">
                    <div className="header__action d-flex justify-content-center justify-content-md-end">
                      <ul>
                      
                        {/* <li>
                          <a href="#">My Account</a>
                        </li> */}
                        <li>
                          <a href="#">My Wishlist</a>
                        </li>
                        <li>
                          {localStorage.token ? (
                              <Link to="/buyer/login">{user && user.first_name}</Link>
                          ) :  <Link to="/buyer/login">Buyer Sign in</Link>}
                          
                        </li>
                        <li>
                          {localStorage.token ? (
                              <Link to="/seller/login">{user && user.first_name}</Link>
                          ) :  <Link to="/seller/login">Seller Sign in</Link>}
                          
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header__info">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-4 col-lg-3">
                    <div className="header__info-left d-flex justify-content-center justify-content-sm-between align-items-center">
                      <div className="logo">
                        <Link to="/">
                          <img
                            src="assets/img/logo/oja.png"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="header__hotline align-items-center d-none d-sm-flex d-lg-none d-xl-flex">
                        <div className="header__hotline-icon">
                          <i className="fal fa-headset" />
                        </div>
                        <div className="header__hotline-info">
                          <span>Hotline Free:</span>
                          <h6>+234-813-347-7843</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-9">
                    <div className="header__info-right">
                      <div className="header__search f-left d-none d-sm-block">

                        <form onSubmit={handleSubmit} >

                      <div>
                      <select id="category" placeholder="Categories" onChange = {handleChange} name = "category">
                        <option value="">All Categories</option>
                        <option value="baby products">Baby Products</option>
                        <option value="computing">Computing</option>
                        <option value="electronics">Electronics</option> 
                        <option value="fashion">Fashion</option>
                        <option value="food drinks">Food/Drinks</option>
                        <option value="health & beauty">Health/Beauty</option>
                        <option value="phones & tablets">Phone/Tablets</option>   
                        <option value="sporting goods">Sporting goods</option>
                        <option value="others">Others</option>   
                    </select>

                    <select id="lower-price" placeholder="Lower Price Limit" onChange = {handleChange} name = "lowerPrice">
                        <option value="0">Lower Price Limit</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="500">500</option> 
                        <option value="1000">1000</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>   
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>   
                    </select>

                    <select id="upper-price" placeholder="Upper Price Limit" onChange = {handleChange} name = "upperPrice">
                        <option value="0">Upper Price Limit</option>
                        <option value="50000">50000</option>
                        <option value="20000">10000</option>
                        <option value="10000">10000</option> 
                        <option value="5000">5000</option>
                        <option value="2000">2000</option>
                        <option value="1000">1000</option>
                        <option value="500">500</option>   
                        <option value="200">200</option>
                        <option value="100">100</option>   
                    </select>
               
                        <input type="text" id="name" placeholder="Search For Product..."  onChange={handleChange} name = "sort"/>
                        <button type="submit">Search</button>
                    </div>
                        </form>
                      </div>
                      <div className="cart__mini-wrapper d-none d-md-flex f-right p-relative">
                        <a href="javascript:void(0);" className="cart__toggle">
                          <span className="cart__total-item">01</span>
                        </a>
                        <span className="cart__content">
                          <span className="cart__my">My Cart:</span>
                          <span className="cart__total-price">$ 255.00</span>
                        </span>


                        {/* <div className="cart__mini">
                          <div className="cart__close">
                            <button type="button" className="cart__close-btn">
                              <i className="fal fa-times" />
                            </button>
                          </div>
                          <ul>
                            <li>
                              <div className="cart__title">
                                <h4>My Cart</h4>
                                <span>(1 Item in Cart)</span>
                              </div>
                            </li>
                            <li>
                              <div className="cart__item d-flex justify-content-between align-items-center">
                                <div className="cart__inner d-flex">
                                  <div className="cart__thumb">
                                    <a href="product-details.html">
                                      <img
                                        src="assets/img/shop/product/cart/cart-mini-1.jpg"
                                        alt
                                      />
                                    </a>
                                  </div>
                                  <div className="cart__details">
                                    <h6>
                                      <a href="product-details.html">
                                        {" "}
                                        Samsung C49J89: £875, Debenhams Plus{" "}
                                      </a>
                                    </h6>
                                    <div className="cart__price">
                                      <span>$255.00</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="cart__del">
                                  <a href="#">
                                    <i className="fal fa-trash-alt" />
                                  </a>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="cart__sub d-flex justify-content-between align-items-center">
                                <h6>Car Subtotal</h6>
                                <span className="cart__sub-total">$255.00</span>
                              </div>
                            </li>
                            <li>
                              <a
                                href="checkout.html"
                                className="t-y-btn w-100 mb-10"
                              >
                                Proceed to checkout
                              </a>
                              <a
                                href="cart.html"
                                className="t-y-btn t-y-btn-border w-100 mb-10"
                              >
                                view add edit cart
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header__bottom">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-9 col-lg-9 col-md-12 col-sm-6 col-6">
                    <div className="header__bottom-left d-flex d-xl-block align-items-center">
                      {/* <div className="side-menu d-xl-none mr-20">
                        <button
                          type="button"
                          className="side-menu-btn side-menu-btn-2 offcanvas-toggle-btn"
                        >
                          <i className="fas fa-bars" />
                        </button>
                      </div> */}

                      <div className="main-menu main-menu-2 d-none d-md-block">
                        <nav>
                          <ul>
                            <li>
                              <a href="about.html">about us</a>
                            </li>
                            <li>
                              <a href="contact.html">contact</a>
                            </li>
                            <li>
                              <a href="about.html">
                                pages <i className="far fa-angle-down" />
                              </a>

                              <ul className="submenu">
                                <li>
                                  <a href="login.html">Login</a>
                                </li>
                                <li>
                                  <a href="register.html">Register</a>
                                </li>
                                <li>
                                  <a href="cart.html">Cart</a>
                                </li>
                                <li>
                                  <a href="wishlist.html">Wishlist</a>
                                </li>
                                <li>
                                  <a href="checkout.html">Checkout</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-sm-6 col-6 d-md-none d-lg-block">
                    <div className="header__bottom-right d-flex justify-content-end">
                      <div className="header__currency">
                        <select>
                          <option>NGN</option>
                        </select>
                      </div>
                      <div className="header__lang d-md-none d-lg-block">
                        <select>
                          <option>English</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        </>
    )
}