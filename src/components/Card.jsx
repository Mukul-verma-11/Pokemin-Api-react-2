import React from 'react'
import './style.css'


const Card = ({ name, image,weight,height }) => {
  return (
      <div className='card' >
      
          <div className="card_box">
            <img src={image} alt={image} />
              <h2>{name}</h2>
              <small>Wt: {weight}</small> <br />
              <small>Ht:{height}</small>
          </div>
          
      </div>
  )
}

export default Card