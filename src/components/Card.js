import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import './home.css'


export default function Card(props) {
  const data = useCart();
  let dispatch = useDispatchCart();
  const handleAddToCart = async () => {
    let product = []
    for (const item of data) {
      if (item.id === props.Item._id) {
        product = item;
        break;
      }
    }

    await dispatch({ type: "ADD", id: props.Item._id, name: props.Item.name, price: props.Item.price })
  }

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '20rem', maxHeight: '500px', marginBottom: '2rem' }}>
          <img src={props.Item.img} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill", width: "100%", padding: '5px' }} />
          <div className="card-body">
            <h5 className="card-title" style={{ height: '2rem', color: '#606060' }}>{props.Item.name}</h5>
            <p style={{ height: '9rem', color: '#787878' }}>{props.Item.description}</p>
            <p>${props.Item.price}/day</p>
            <hr></hr>
            <button className='justify-center rent-button' onClick={handleAddToCart}>Rent</button>
          </div>
        </div>
      </div>
    </div>
  )
}

