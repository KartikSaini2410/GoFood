import React, {useRef, useState, useEffect} from 'react';
import _ from 'lodash';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatchCart, useCart } from '../components/ContextReducer';

export default function Details() {

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();
    const navigate = useNavigate();
    const selectedItem = useSelector((state)=> state?.counter?.value);
    let options = selectedItem.options[0];
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    let data = useCart();
    let finalPrice = qty*parseInt(options[size]);

    useEffect(()=> {
      let mailId = localStorage.getItem('userEmail');
      if(_.isEmpty(mailId)){
          navigate('/login');
      }
    },[])

    useEffect(()=> {
        setSize(priceRef.current.value);
    },[])

    const addToCart = async () => {
        let food = []
        for (const item of data) {
          if (_.isEqual(item.id, selectedItem._id)) {
            food = item;
    
            break;
          }
        }

        if (!_.isEmpty(food)) {
          if (_.isEqual(food.size, size)) {
            await dispatch({ type: "UPDATE", id: selectedItem._id, price: finalPrice, qty: qty })
            return
          }
          else if (!_.isEqual(food.size, size)) {
            await dispatch({ type: "ADD", id: selectedItem._id, name: selectedItem.name, price: finalPrice, qty: qty, size: size,img: selectedItem.img })
            return
          }
          return
        }
        await dispatch({type:"ADD", id:selectedItem._id, name:selectedItem.name, price:finalPrice, qty:qty, size:size, img:selectedItem.img })
    }

  return (
    <div>
        <div><Navbar /></div>
        <div className='row text-white'>
            <div className='col-6 pt-2' style={{marginLeft:"7px"}}> 
                <img src={selectedItem.img} alt="" />
            </div>
            <div className='col-5 mt-5'>
                <h3>{selectedItem.name}</h3>
                <div className='container w-100'>
                    <div>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(6), (e,index)=> {
                            return(
                                <option key={index+1} value={index+1}>{index+1}</option>
                            )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {_.map(priceOptions, (option)=> {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                <div className='h-100 fs-5 '>Price - ₹{finalPrice}/-</div>
                <button className='btn btn-success justify-center ms-2 mt-3' onClick={addToCart}>Add To Cart</button>
                <hr />
                <div className='h-100 mt-4'><strong>Description </strong> - {selectedItem.description}</div>
                </div>
            </div>
        </div>
    </div>
  )
}
