import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function () {
    const [values, setValues] = useState({name: "", email: "", password: "", geolocation: ""})
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data= {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:values.name, password:values.password, email:values.email, location:values.geolocation})
        }
        const response = await fetch('https://nimble-stardust-93d950.netlify.app/api/createuser', data);
        const json = await response.json();

        if(!json.success){
            alert('Enter valid credentials')
        }
        if(json.success){
            setValues({name: "", email: "", password: "", geolocation: ""});
            alert('Account created successfully');
            navigate('/login');
        }
    }

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
                        <label htmlFor="name" className="form-label text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="geolocation"
                            value={values.geolocation}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">
                    Submit
                    </button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    </>
  );
}
