import React from 'react'
import "./featuredProperties.css"

const FeaturedProperties = () => {
  return (
    <div className="fp">
    <div className="fpItem">
      <img
        src="https://lh5.googleusercontent.com/p/AF1QipOlg7U19yBHdzA_soRWxkE1ezFC46tkVGr0c4PU=w253-h175-k-no"
        alt=""
        className="fpImg"
      />
      <span className="fpName">Hotel Ashiyana</span>
      <span className="fpCity">Pune</span>
      <span className="fpPrice">Starting from ₹2016</span>
      <div className="fpRating">
        <button>8.9</button>
        <span>Excellent</span>
      </div>
    </div>
    <div className="fpItem">
      <img
        src="https://lh5.googleusercontent.com/p/AF1QipOrS68qmoagr4-xtyFOuplnNA4FHWR2Jksg02cP=w253-h168-k-no"
        alt=""
        className="fpImg"
      />
      <span className="fpName">Radisson Blu</span>
      <span className="fpCity">Mumbai</span>
      <span className="fpPrice">Starting from ₹3477</span>
      <div className="fpRating">
        <button>9.3</button>
        <span>Exceptional</span>
      </div>
    </div>
    <div className="fpItem">
      <img
        src="https://lh5.googleusercontent.com/p/AF1QipMqPwASQiZ3rVSPYOsdualZuL4mIX7ZREcMrjb8=w253-h189-k-no"
        alt=""
        className="fpImg"
      />
      <span className="fpName">De Pavilion Hotel</span>
      <span className="fpCity">Delhi</span>
      <span className="fpPrice">Starting from ₹2486</span>
      <div className="fpRating">
        <button>8.8</button>
        <span>Excellent</span>
      </div>
    </div>
    <div className="fpItem">
      <img
        src="https://lh5.googleusercontent.com/p/AF1QipNguPGLR-BObPfB69E4gIeYjgFPhPYMC2hSQEVH=w253-h165-k-no"
        alt=""
        className="fpImg"
      />
      <span className="fpName">The Elanza Hotel</span>
      <span className="fpCity">Bangaluru</span>
      <span className="fpPrice">Starting from ₹2743</span>
      <div className="fpRating">
        <button>8.9</button>
        <span>Excellent</span>
      </div>
    </div>
  </div>
  )
}

export default FeaturedProperties