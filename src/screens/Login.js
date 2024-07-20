import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Login() {

  const [values, setValues] = useState({email: "", password: ""});
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(()=> {
    let mailId = localStorage.getItem('userEmail');
    if(!_.isEmpty(mailId)){
        navigate('/');
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: values.password, email: values.email }),
        credentials: 'include' // Include credentials in the request
    };

    try {
        const response = await fetch('https://food-backend-eight.vercel.app/api/loginuser', data);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert('Enter valid credentials');
        } else {
            localStorage.setItem('userEmail', values.email);
            localStorage.setItem('AUTH_TOKEN', json.authToken);
            navigate('/');
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
        // Handle fetch error (e.g., show user a message)
    }
};

  const handleChange = (e) => {
    e.preventDefault();
    setValues({...values, [e.target.name]: e.target.value});
}

  return (
    <>
        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text text-white">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">
                    Submit
                    </button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Not a user</Link>
                </form>
            </div>
        </div>
    </>
  );
}
