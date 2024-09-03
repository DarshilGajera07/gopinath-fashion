import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        savecart(JSON.parse(localStorage.getItem("cart")))
      } 
    } catch (error) {
      console.error(error);
      localStorage.clear()
      
    }
  }, [])
  

  const savecart = (mycart) =>{
    localStorage.setItem('cart', JSON.stringify(mycart))
    let subt=0;
    let keys = Object.keys(mycart)
    for (let i = 0; i<keys.length; i++) {
      subt += mycart[keys[i]].price * mycart[keys[i]].qty
      
    }
    setsubtotal(subt)
  }

  const addtocart = (itemcode,qty, price, name, size, variant)=>{
    let newcart = {...cart};
    if (itemcode in cart) {
      
      newcart[itemcode].qty = cart[itemcode].qty + qty
    }
    else{
      newcart[itemcode] = {qty:1, price, name, size, variant}
    }
    setcart(newcart)
    savecart(newcart)

  }

  const clearcart = () =>{
    setcart({})
    savecart({})
  }


  const removefromcart = (itemcode,qty, price, name, size, variant)=>{
    let newcart = {...cart};
    if (itemcode in cart) {
      
      newcart[itemcode].qty = cart[itemcode].qty - qty
    }
    if (newcart[itemcode]["qty"]<=0) {
      delete newcart[itemcode]
    }
    setcart(newcart)
    savecart(newcart)

  }

  return <>
    <Navbar key={subtotal} cart={cart} addtocart={addtocart} removefromcart={removefromcart} clearcart={clearcart} subtotal={subtotal} />
    <Component cart={cart} addtocart={addtocart} removefromcart={removefromcart} clearcart={clearcart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
