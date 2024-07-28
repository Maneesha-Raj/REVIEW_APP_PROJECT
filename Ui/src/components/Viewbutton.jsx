import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Viewbutton = ({product}) => {
  return (
    <>
        <Link to={`/view-product/${product}`}>
           <button class=" rounded-full bg-teal-500 px-8 py-2 hover:outline-double  hover:outline-teal-500">View</button>     
        </Link>
    </>
  )
}

export default Viewbutton