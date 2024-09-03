import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({ cart, addtocart, removefromcart, clearcart, subtotal }) => {
  console.log(cart, addtocart, removefromcart, clearcart, subtotal)
  const togglecart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

  }
  const ref = useRef()
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10'>
      <div className='logo mx-5'>
        <Link href={'/'}>
          <Image src={"/logo.jpeg"} alt='' width={"100"} height={"100"} />
        </Link>
      </div>
      <div className='nav'>
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/hoodies'}><li>Hoodies</li></Link>
          <Link href={'/stickers'}><li>Stickers</li></Link>
          <Link href={'/mugs'}><li>Mugs</li></Link>
          <Link href={'/tshirts'}><li>Tshirts</li></Link>
        </ul>
      </div>
      <div onClick={togglecart} className='cursor-pointer cart absolute right-0 top-4 mx-5'>
        <AiOutlineShoppingCart className='text-xl md:text-2xl' />
      </div>

      <div ref={ref} className={`sideCart w-72 h-[100vh] absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={togglecart} className='absolute top-4 right-2 cursor-pointer text-2xl'><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 &&
            <div className='my-4 font-semibold'>Your cart is Empty!</div>
          }
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className='item flex my-5'>
                <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                  <AiFillMinusCircle onClick={() => { removefromcart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='cursor-pointer' /><span className='mx-2'> {cart[k].qty} </span> <AiFillPlusCircle onClick={() => { addtocart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='cursor-pointer' />
                </div>
              </div>
            </li>
          })}

        </ol>

        <div className='font-bold my-2'>Subtotal : ₹ {subtotal}</div>
        <div className='flex'>
          
         <Link href={'/checkout'}>
         <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button>
         </Link>
          <button onClick={clearcart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>

    </div>
  )
}

export default Navbar
