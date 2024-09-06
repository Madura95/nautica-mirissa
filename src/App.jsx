import { useState } from 'react'
import React from 'react'
import HeroSlider from './HeroSlider'; 
import { Link } from 'react-router-dom'
import Header from './Header';



function App() {

  return (
    <>
     <div>
      
      <Header/>

      <section id='hero'>
        <HeroSlider/>
        <div className="hero-content">
        <h2>Welcome to Nautica Mirissa</h2>
        <p>Where Flavor Meets the Ocean</p>
        </div>
      </section>

      <section id='featured-dishes'>

        <h2>Our Featured Dishes</h2>

        <div className='dishes'>

          <div className="dish">
            <img src="/images/dishes/dish1.jpg" alt="Dish Name 01" className="dish-image" />
            <h3>Dish Name 01</h3>
            <p>Description of dish 01</p>
          </div>

          <div className="dish">
            <img src="/images/dishes/dish2.jpg" alt="Dish Name 01" className="dish-image" />
            <h3>Dish Name 02</h3>
            <p>Description of dish 02</p>
          </div>

          <div className="dish">
            <img src="/images/dishes/dish3.jpg" alt="Dish Name 01" className="dish-image" />
            <h3>Dish Name 03</h3>
            <p>Description of dish 03</p>
          </div>

        </div>
      </section>

      <footer>
        <p>Contact us: 071 607 5888 </p>
        <p>Follow us on social media!
          <a href="https://www.google.com/maps/place/Your+Restaurant" target="_blank" rel="noopener noreferrer"> Google Profile</a> |
          <a href="https://www.facebook.com/YourRestaurant" target="_blank" rel="noopener noreferrer"> Facebook</a> |
          <a href="https://www.instagram.com/YourRestaurant" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
        <div className="map">
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15873.31590625334!2d80.4527381!3d5.949326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae115ffc8d2dc6d%3A0x963ba6635273ddd8!2sNautica%20Mirissa!5e0!3m2!1sen!2slk!4v1725110527025!5m2!1sen!2slk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
        </div>
      </footer>
     </div>
    </>
  )
}

export default App
