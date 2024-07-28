import React from 'react'
import { Link} from 'react-router-dom'

const AddReviewbutton = () => {
  return (
    <>
            <Link to='/add-review'>
            <button className="rounded-full bg-cyan-500 px-4 py-2 hover:outline-double  hover:outline-cyan-500">Add a Review</button>
            </Link>
    </>
  )
}

export default AddReviewbutton