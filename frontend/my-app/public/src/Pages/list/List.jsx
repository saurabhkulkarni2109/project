import React from 'react'
import "./list.css"
import Header from '../../component/header/Header'
import Navbar from '../../component/navbar/Navbar'
const List = () => {
  return (
    <div>
   <Navbar />
  <Header type="list" />
    <div className="listContainer">
      <div className="listWrapper">
         
      </div>
    </div>
    </div>
  )
}

export default List