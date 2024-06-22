import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from '../components/Card';
import burgerImage from "../images/burger.jpg";
import pizzaImage from "../images/pizza.jpg";
import barbequeImage from "../images/barbeque.jpg"

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async ()=> {
    let data= {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    let response = await fetch('http://localhost:4000/api/foodData', data);
    response = await response.json();
      setFoodCat(response[1]);
      setFoodItem(response[0]);
      // setFoodData(allData)

  }

  useEffect(()=> {
    localStorage.setItem("currPage", "home");
    loadData();
  },[])

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{zIndex:"10"}}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
              </div>
            </div>
              <div className="carousel-item active">
              <img src={burgerImage} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
              <div className="carousel-item">
              <img src={pizzaImage} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
              <div className="carousel-item">
              <img src={barbequeImage} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {!_.isEmpty(foodCat) && 
          _.map(foodCat, (category)=> {
            return (
              <div className='row mb-3'>
                <div key={category._id} className='fs-3 m-3 text-white'>{category.CategoryName}</div>
                <hr style={{color:"white"}}/>
                {!_.isEmpty(foodItem) ? 
                  _.map(_.filter(foodItem, { 'CategoryName': category.CategoryName }), (filterItems) => {
                    if (_.includes(_.toLower(filterItems.name), _.toLower(search))) {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card 
                            foodItem={filterItems}
                            options={filterItems.options}
                          />
                        </div>
                      );
                    }
                  })
                   :
                  <div>No such data found</div>
                }
              </div>
            )
          })
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
