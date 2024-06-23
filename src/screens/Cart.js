import React from 'react';
import _ from 'lodash';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (_.isEqual(data.length, 0)) {
        return (
        <div>
            <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
        </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("https://nimble-stardust-93d950.netlify.app/api/orderData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
        })
        });
        if (response.status === 200) {
        dispatch({ type: "DROP" })
        }
    }

     let totalPrice = _.reduce(data, (total, food) => total + food.price, 0);
    return (
        <div>
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
            <table className='table table-hover '>
            <thead className=' text-success fs-4'>
                <tr>
                <th scope='col' >#</th>
                <th scope='col' >Name</th>
                <th scope='col' >Quantity</th>
                <th scope='col' >Option</th>
                <th scope='col' >Amount</th>
                <th scope='col' ></th>
                </tr>
            </thead>
            <tbody>
                {_.map(data, (food, index) => (
                <tr>
                    <th scope='row' className='text-white'>{index + 1}</th>
                    <td className='text-white'>{food.name}</td>
                    <td className='text-white'>{food.qty}</td>
                    <td className='text-white'>{food.size}</td>
                    <td className='text-white'>{food.price}</td>
                    <td className='text-white'><button type="button" className="btn p-0 text-white" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}> Remove</button> </td></tr>
                ))}
            </tbody>
            </table>
            <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
            <div>
            <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
            </div>
        </div>



        </div>
    )
}