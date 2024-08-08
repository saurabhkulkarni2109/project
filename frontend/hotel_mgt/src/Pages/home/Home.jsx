import React from 'react'
import "./home.css"
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import Featured from '../../component/featured/Featured'
import PropertyList from '../../component/propertyList/PropertyList'
import FeaturedProperties from '../../component/featuredProperties/FeaturedProperties'
import MailList from '../../component/mailList/MailList'
import Footer from '../../component/footer/Footer'




const Home = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <div className="homeContainer">
    <Featured/>
    <h1 className="homeTitle">Browse by property type</h1>
    <PropertyList/>
    <h1 className="homeTitle">Home guests love</h1>
    <FeaturedProperties/>
    <MailList/>
    <Footer/>
    </div>
    </>
    
  )
}

export default Home