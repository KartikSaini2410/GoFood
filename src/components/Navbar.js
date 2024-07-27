import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Navbar() {
  
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('userEmail');
    navigate('/login');
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/home">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2">
                  {window.location.pathname !== "/login" && window.location.pathname !== "/createuser" &&
                    <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/home">Home</Link>
                    </li>
                  }
                  {localStorage.getItem('AUTH_TOKEN') && 
                    <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                    </li>
                  }          
                </ul>
                {!localStorage.getItem('AUTH_TOKEN') ? 
                  <div className='d-flex'>
                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                    <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                  </div> :
                  <div>
                    <div className="btn bg-white text-success mx-1" onClick={()=> setCartView(true)}>
                      My Cart{" "}
                      {data.length>0 && <Badge pill bg="danger">{data.length}</Badge>}
                    </div>
                    {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal> }
                    <div className="btn bg-white text-danger mx-1" onClick={logout}>Logout</div>
                  </div>
                }
                </div>
            </div>
        </nav>
    </div>
  )
}
