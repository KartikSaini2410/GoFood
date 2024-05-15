import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();

    let foodItem = props.foodItem;
    let options = props.options[0];
    let priceOptions = Object.keys(options);

    let dispatch = useDispatchCart();
    let data = useCart();
    let finalPrice = qty*parseInt(options[size]);

    const addToCart = async () => {
        let food = []
        console.log(foodItem,"foodItem")
        for (const item of data) {
          if (_.isEqual(item.id, props.foodItem._id)) {
            food = item;
    
            break;
          }
        }
        console.log(food, size, "food")

        if (!_.isEmpty(food)) {
          if (_.isEqual(food.size, size)) {
            await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
            return
          }
          else if (!_.isEqual(food.size, size)) {
            await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
        await dispatch({type:"ADD", id:foodItem._id, name:foodItem.name, price:finalPrice, qty:qty, size:size, img:foodItem.img })
        console.log(data,"data")
    }

    useEffect(()=> {
        setSize(priceRef.current.value);
    },[])


  return (
    <>
        <div className="card mt-3" style={{width: "18rem", maxHeight: "360px"}}>
            <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"150px", objectFit:"fill"}} />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <div className='container w-100'>
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
                <div className='d-inline h-100 fs-5'> ₹{finalPrice}/-</div>
                </div>
                <hr />
                <button className='btn btn-success justify-center ms-2' onClick={addToCart}>Add To Cart</button>
            </div>
        </div>
    </>
  )
}
